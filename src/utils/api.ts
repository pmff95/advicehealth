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

export async function authenticate(
  username: string,
  password: string,
): Promise<string> {
  const response = await fetch(getEndpoint("/auth"), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username,
      password,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error("Falha ao autenticar");
  }

  const data = (await response.json()) as AuthResponse;
  const token = data.access_token ?? data.token;

  if (!token) {
    throw new Error("Token não encontrado na resposta");
  }

  return token;
}

