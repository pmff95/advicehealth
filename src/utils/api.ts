import type { CurrentUserResponse, UserProfile } from "../types/user";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getEndpoint(path: string) {
  if (!API_BASE_URL) {
    throw new Error("A URL base da API não foi configurada.");
  }

  return new URL(path, API_BASE_URL).toString();
}

interface AuthResponse {
  access_token?: string;
  token?: string;
  [key: string]: unknown;
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (typeof value === "string" && value.trim()) {
    return [value];
  }

  return undefined;
}

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
    cpf: data.cpf,
    birthDate: normalizeBirthDate(data),
    phones: normalizeStringArray(data.phones),
    emails:
      normalizeStringArray(data.emails) ?? normalizeStringArray(data.email),
    cardNumber: data.cardNumber ?? data.card_number,
    operator: data.operator,
  };
}
