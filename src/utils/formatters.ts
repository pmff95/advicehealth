const NON_DIGIT_REGEX = /\D+/g;

const normalizeDigits = (value: string | null | undefined) =>
  (value ?? "").replace(NON_DIGIT_REGEX, "");

/**
 * Formata um CPF para o padrão 000.000.000-00.
 * Aceita valores já formatados ou somente com dígitos.
 */
export const formatCPF = (value: string | null | undefined): string => {
  const digits = normalizeDigits(value).slice(0, 11);

  if (!digits) {
    return "";
  }

  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

/**
 * Formata telefones nacionais considerando DDD e números de 8 ou 9 dígitos.
 */
export const formatPhone = (value: string | null | undefined): string => {
  const digits = normalizeDigits(value).slice(0, 11);

  if (!digits) {
    return "";
  }

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  const ddd = digits.slice(0, 2);
  const remaining = digits.slice(2);

  if (remaining.length <= 4) {
    return `(${ddd}) ${remaining}`;
  }

  const middle = remaining.length === 8
    ? remaining.slice(0, 4)
    : remaining.slice(0, remaining.length - 4);
  const suffix = remaining.slice(remaining.length - 4);

  return `(${ddd}) ${middle}-${suffix}`;
};

export const digitsOnly = (value: string | null | undefined): string =>
  normalizeDigits(value);
