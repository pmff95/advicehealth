import type { CurrentUserResponse, UserProfile } from "../types/user";
import type { Guide } from "../types/guide";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getEndpoint(path: string) {
  if (!API_BASE_URL) {
    throw new Error("A URL base da API não foi configurada.");
  }

  return new URL(path, API_BASE_URL).toString();
}
export interface BeneficiaryResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  birth_date?: string;
}

interface UpdateUserRequest {
  name?: string;
  birth_date?: string;
  additional_emails?: { email: string; is_active: boolean; uuid?: string }[];
  phones?: { number: string; is_active: boolean; uuid?: string }[];
}
interface RegisterUserRequest {
  name: string;
  email: string;
  phone?: string;
  cpf?: string;
  guide_number?: string;
  birth_date?: string;
  password: string;
  additional_emails?: { email: string; is_active: boolean }[];
  phones?: { number: string; is_active: boolean }[];
}

interface RegisterUserResponse {
  uuid: string;
  [key: string]: unknown;
}

interface ApiErrorResponse {
  detail?:
    | string
    | {
        message?: string;
        [key: string]: unknown;
      };
  message?: string;
  [key: string]: unknown;
}

interface RegistrationErrorResponse {
  code: string;
  message: string;
}
interface PreRegistrationTokenRequest {
  email: string;
  nome: string;
}
interface AuthResponse {
  access_token?: string;
  token?: string;
  [key: string]: unknown;
}

// function normalizeStringArray(value: unknown): string[] | undefined {
//   if (Array.isArray(value)) {
//     return value.map((item) => String(item));
//   }

//   if (typeof value === "string" && value.trim()) {
//     return [value];
//   }

//   return undefined;
// }

function normalizeBirthDate(response: CurrentUserResponse): string | undefined {
  const { birthDate, birth_date, date_of_birth } = response;
  const rawDate = birthDate ?? birth_date ?? date_of_birth;

  if (!rawDate) {
    return undefined;
  }

  const isoDateMatch = /^\d{4}-\d{2}-\d{2}/.test(rawDate);

  if (!isoDateMatch) {
    return rawDate;
  }

  const [year, month, day] = rawDate.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

export async function authenticate(
  email: string,
  password: string
): Promise<string> {
  const response = await fetch(getEndpoint("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao autenticar";

    const attempts =
      typeof data.detail === "object" &&
      "attempts_remaining" in data.detail &&
      data.detail.attempts_remaining > 0
        ? ` (Tentativas restantes: ${data.detail.attempts_remaining})`
        : "";

    throw new Error(`${message}${attempts}`);
  }

  const token = (data as AuthResponse).access_token ?? data.token;
  if (!token) {
    throw new Error("Token não encontrado na resposta");
  }

  return token;
}

export async function fetchCurrentUser(token: string): Promise<UserProfile> {
  const response = await fetch(getEndpoint("/users/current"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar usuário logado");
  }

  const data = (await response.json()) as CurrentUserResponse;

  return {
    id: String(data.id ?? ""),
    name: data.name ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    cpf: data.cpf,
    birthDate: normalizeBirthDate(data),
    phones: data.phones ?? [],
    additional_emails: data.additional_emails ?? [],

    cardNumber: data.cardNumber ?? data.card_number,
    operator: data.operator,
  };
}

export async function registerUser(
  payload: RegisterUserRequest
): Promise<RegisterUserResponse> {
  const response = await fetch(getEndpoint("/users/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = (await response
      .json()
      .catch(() => ({}))) as RegisterUserResponse;
    if (!data.uuid) {
      throw new Error("Usuário cadastrado, mas UUID não retornado.");
    }
    return data;
  }

  const data = (await response.json().catch(() => ({}))) as ApiErrorResponse;

  const detail = data.detail;
  if (typeof detail === "string" && detail.trim()) {
    throw new Error(detail);
  }

  if (detail && typeof detail === "object" && "message" in detail) {
    const message = detail.message;
    if (typeof message === "string" && message.trim()) {
      throw new Error(message);
    }
  }

  if (typeof data.message === "string" && data.message.trim()) {
    throw new Error(data.message);
  }

  throw new Error("Falha ao realizar cadastro. Tente novamente.");
}

export async function fetchGuidesByBeneficiary(
  token: string,
  beneficiaryId: number
): Promise<Guide[]> {
  const response = await fetch(
    getEndpoint(`/process/beneficiary/${beneficiaryId}`),
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao buscar guias do beneficiário");
  }

  return await response.json();
}

export async function fetchGuideDetail(
  token: string,
  numeroGuia: string
): Promise<Guide> {
  const response = await fetch(getEndpoint(`/process/${numeroGuia}`), {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Falha ao buscar detalhes da guia");
  }

  return await response.json();
}

export async function fetchBeneficiaryId(
  token: string,
  payload: { guide_number: string; birth_date: string }
): Promise<BeneficiaryResponse> {
  const response = await fetch(getEndpoint("/beneficiary/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof data.detail === "string"
        ? data.detail
        : "Informação do Beneficiário não encontrada";
    throw new Error(message);
  }

  return await response.json();
}

export async function updateCurrentUser(
  token: string,
  payload: UpdateUserRequest
): Promise<void> {
  const response = await fetch(getEndpoint("/users/current"), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as ApiErrorResponse;
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao atualizar usuário";
    throw new Error(message);
  }
}

export async function addPhone(token: string, number: string): Promise<void> {
  const response = await fetch(getEndpoint("/users/current/add-phone"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      number,
      is_active: true,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao adicionar telefone";
    throw new Error(message);
  }
}

export async function addEmail(token: string, email: string): Promise<void> {
  const response = await fetch(getEndpoint("/users/current/add-email"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email,
      is_active: true,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao adicionar e-mail";
    throw new Error(message);
  }
}

/* NOVO - Toggle telefone */
export async function togglePhone(
  token: string,
  phoneUuid: string,
  isActive: boolean
): Promise<void> {
  const response = await fetch(
    getEndpoint(
      `/users/current/change-status-phones/${phoneUuid}?is_active=${isActive}`
    ),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao alterar status do telefone";
    throw new Error(message);
  }
}

export async function toggleEmail(
  token: string,
  emailUuid: string,
  isActive: boolean
): Promise<void> {
  const response = await fetch(
    getEndpoint(
      `/users/current/change-status-email/${emailUuid}?is_active=${isActive}`
    ),
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao alterar status do e-mail";
    throw new Error(message);
  }
}

export async function sendPreRegistrationToken(
  userId: string,
  payload: PreRegistrationTokenRequest
): Promise<void> {
  const response = await fetch(
    getEndpoint(`/registration/${userId}/pre-registration-token`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao enviar e-mail de confirmação";
    throw new Error(message);
  }
}

export async function validateToken(
  token: string,
  endpoint: string
): Promise<void> {
  const response = await fetch(getEndpoint(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: "",
  });

  if (!response.ok) {
    let errorData: RegistrationErrorResponse | undefined;

    try {
      const data = await response.json();
      errorData = data.detail as RegistrationErrorResponse;
    } catch {
      throw new Error("Falha ao validar token");
    }

    if (!errorData) {
      throw new Error("Falha ao validar token");
    }

    switch (errorData.code) {
      case "TOKEN_INVALID":
        throw new Error("Link inválido");
      case "TOKEN_EXPIRED":
        throw new Error("Link expirou. Solicite um novo link.");
      case "TOKEN_NOT_FOUND":
        throw new Error("Token não encontrado");
      case "USER_REGISTERED":
        throw new Error("Usuário já finalizou o processo");
      case "USER_NOT_FOUND":
        throw new Error("Usuário não encontrado");
      case "INTERNAL_ERROR":
      default:
        throw new Error(errorData.message ?? "Erro interno do servidor");
    }
  }
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  const response = await fetch(getEndpoint("/forgot-password/reset-request"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof data.detail === "string"
        ? data.detail
        : data.detail?.message ?? "Falha ao enviar e-mail de recuperação";
    throw new Error(message);
  }
}

export async function checkPasswordReset(token: string) {
  const res = await fetch(
    `/forgot-password/check-password-reset?token=${token}`
  );
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export async function confirmPasswordReset(token: string, newPassword: string) {
  const res = await fetch(
    getEndpoint(`/forgot-password/finalize-password-reset`),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ new_password: newPassword }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Erro ao redefinir senha.");
  }

  return res.json();
}
