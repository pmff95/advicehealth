export const digitsOnly = (value: string): string => value.replace(/\D/g, "");

const formatCpfDigits = (value: string): string => {
  const digits = value.slice(0, 11);
  let masked = digits.slice(0, 3);
  if (digits.length > 3) masked += "." + digits.slice(3, 6);
  if (digits.length > 6) masked += "." + digits.slice(6, 9);
  if (digits.length > 9) masked += "-" + digits.slice(9, 11);
  return masked;
};

export const maskCpf = (value: string): string => formatCpfDigits(digitsOnly(value));

export const formatDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split("/");
  if (!day || !month || !year) return dateStr; 
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const formatCPF = (value: string): string => {
  const digits = digitsOnly(value);
  if (!digits) return "";
  return formatCpfDigits(digits);
};

const formatPhoneDigits = (value: string): string => {
  const digits = value.slice(0, 11);
  const hasNineDigit = digits.length > 10;
  const ddd = digits.slice(0, 2);
  const prefix = hasNineDigit ? digits.slice(2, 7) : digits.slice(2, 6);
  const suffix = hasNineDigit ? digits.slice(7, 11) : digits.slice(6, 10);

  let masked = ddd ? `(${ddd})` : "";
  if (prefix) masked += ` ${prefix}`;
  if (suffix) masked += `-${suffix}`;
  return masked.trim();
};

export const maskPhone = (value: string): string => formatPhoneDigits(digitsOnly(value));

export const formatPhone = (value: string): string => {
  const digits = digitsOnly(value);
  if (!digits) return "";
  return formatPhoneDigits(digits);
};

export const maskBirthDate = (value: string): string => {
  const digits = digitsOnly(value);

  const normalizedDigits = value.includes("-")
    ? `${digits.slice(6, 8)}${digits.slice(4, 6)}${digits.slice(0, 4)}`
    : digits;

  const limitedDigits = normalizedDigits.slice(0, 8);

  if (!limitedDigits) return "";

  if (limitedDigits.length <= 2) return limitedDigits;

  if (limitedDigits.length <= 4) {
    return `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(2)}`;
  }

  return `${limitedDigits.slice(0, 2)}/${limitedDigits.slice(2, 4)}/${limitedDigits.slice(4)}`;
};

const extractBirthDateDigits = (value: string): string => {
  const digits = digitsOnly(value);

  return value.includes("-")
    ? `${digits.slice(6, 8)}${digits.slice(4, 6)}${digits.slice(0, 4)}`
    : digits;
};

export const formatBirthDateForApi = (value: string): string | undefined => {
  const birthDateMatches = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!birthDateMatches) {
    return value || undefined;
  }

  return `${birthDateMatches[3]}-${birthDateMatches[2]}-${birthDateMatches[1]}`;
};

export const formatDateToISO = (value: string): string => {
  const formatted = formatBirthDateForApi(value);
  if (formatted) return formatted;
  const digits = extractBirthDateDigits(value);
  if (digits.length === 8) {
    return `${digits.slice(4)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
  }
  return value;
};
