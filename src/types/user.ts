export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  phones: { uuid?: string; number: string; is_active: boolean }[];
  additional_emails: { uuid?: string; email: string; is_active: boolean }[];
  cardNumber?: string;
  operator?: string;
  guideNumber?: string;
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
  phones?: { uuid?: string; number: string; is_active: boolean }[];
  additional_emails?: { uuid?: string; email: string; is_active: boolean }[];
  cardNumber?: string;
  card_number?: string;
  operator?: string;
  [key: string]: unknown;
};
