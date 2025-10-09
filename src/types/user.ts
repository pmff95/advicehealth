export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  phones?: string[];
  emails?: string[];
  cardNumber?: string;
  operator?: string;
}

export type CurrentUserResponse = {
  id?: string | number;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  birth_date?: string;
  date_of_birth?: string;
  phones?: unknown;
  emails?: unknown;
  cardNumber?: string;
  card_number?: string;
  operator?: string;
  [key: string]: unknown;
};
