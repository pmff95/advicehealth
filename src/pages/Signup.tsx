import "./Signup.css";
import Button from "../components/Button/Button";
import { registerUser } from "../utils/api";
import { useMemo, useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import SignupSuccess from "./SignupSuccess";

interface SignupProps {
  onBackToLogin: () => void;
  beneficiaryData: {
    cpf: string;
    birthDate: string;
    fullName: string;
    email?: string;
    phone?: string;
  };
}

const digitsOnly = (value: string) => value.replace(/\D/g, "");

const maskCpf = (value: string) => {
  const digits = digitsOnly(value).slice(0, 11);
  let masked = digits.slice(0, 3);
  if (digits.length > 3) masked += "." + digits.slice(3, 6);
  if (digits.length > 6) masked += "." + digits.slice(6, 9);
  if (digits.length > 9) masked += "-" + digits.slice(9, 11);
  return masked;
};

const maskPhone = (value: string) => {
  const digits = digitsOnly(value).slice(0, 11);
  const hasNineDigit = digits.length > 10;
  const ddd = digits.slice(0, 2);
  const prefix = hasNineDigit ? digits.slice(2, 7) : digits.slice(2, 6);
  const suffix = hasNineDigit ? digits.slice(7, 11) : digits.slice(6, 10);

  let masked = ddd ? `(${ddd})` : "";
  if (prefix) masked += ` ${prefix}`;
  if (suffix) masked += `-${suffix}`;
  return masked.trim();
};

export default function Signup({ onBackToLogin, beneficiaryData }: SignupProps) {
  const [formValues, setFormValues] = useState({
    guideNumber: "",
    cpf: "",
    birthDate: "",
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      cpf: maskCpf(beneficiaryData.cpf),
      birthDate: beneficiaryData.birthDate,
      fullName: beneficiaryData.fullName,
      email: beneficiaryData.email ?? "",
      phone: beneficiaryData.phone ?? "",
    }));
  }, [beneficiaryData]);

  const [errorMessage, setErrorMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signupCompleted, setSignupCompleted] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>("");

  const trimmedFormValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(formValues).map(([k, v]) => [k, String(v).trim()])
    ) as Record<string, string>;
  }, [formValues]);

  const hasEmptyRequiredFields = useMemo(() => {
    const required = ["guideNumber", "cpf", "birthDate", "fullName", "phone", "email", "password", "confirmPassword"];
    return required.some((field) => !trimmedFormValues[field as keyof typeof trimmedFormValues]);
  }, [trimmedFormValues]);

  const passwordTooShort = trimmedFormValues.password.length > 0 && trimmedFormValues.password.length < 6;
  const passwordsMismatch = trimmedFormValues.password && trimmedFormValues.confirmPassword && trimmedFormValues.password !== trimmedFormValues.confirmPassword;

  const validationMessage = useMemo(() => {
    if ((submitAttempted || trimmedFormValues.password || trimmedFormValues.confirmPassword) && passwordTooShort) {
      return "A senha deve conter pelo menos 6 caracteres.";
    }
    if ((submitAttempted || trimmedFormValues.confirmPassword) && passwordsMismatch) {
      return "As senhas não conferem.";
    }
    if ((submitAttempted || hasInteracted) && hasEmptyRequiredFields) {
      return "Preencha todos os campos obrigatórios.";
    }
    return "";
  }, [hasEmptyRequiredFields, hasInteracted, passwordTooShort, passwordsMismatch, submitAttempted, trimmedFormValues.password, trimmedFormValues.confirmPassword]);

  const isSubmitDisabled: boolean =
    Boolean(isSubmitting) ||
    Boolean(hasEmptyRequiredFields) ||
    Boolean(passwordTooShort) ||
    Boolean(passwordsMismatch);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    let maskedValue = value;
    if (name === "cpf") maskedValue = maskCpf(value);
    if (name === "phone") maskedValue = maskPhone(value);

    setHasInteracted(true);
    setFormValues((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setHasInteracted(true);
    setErrorMessage("");

    if (hasEmptyRequiredFields || passwordTooShort || passwordsMismatch) return;

    try {
      setIsSubmitting(true);
      const birthDateMatches = trimmedFormValues.birthDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      const formattedBirthDate = birthDateMatches
        ? `${birthDateMatches[3]}-${birthDateMatches[2]}-${birthDateMatches[1]}`
        : trimmedFormValues.birthDate || undefined;

      await registerUser({
        name: trimmedFormValues.fullName,
        email: trimmedFormValues.email,
        phone: trimmedFormValues.phone ? digitsOnly(trimmedFormValues.phone) : undefined,
        cpf: trimmedFormValues.cpf ? digitsOnly(trimmedFormValues.cpf) : undefined,
        guide_number: trimmedFormValues.guideNumber || undefined,
        birth_date: formattedBirthDate,
        password: trimmedFormValues.password,
      });

      setRegisteredEmail(trimmedFormValues.email);
      setSignupCompleted(true);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };


if (signupCompleted) {
  return (
    <SignupSuccess
      email={registeredEmail}
      onGoToLogin={onBackToLogin}
    />
  );
}
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="signup-left">
        <div className="signup-page">
          <div className="portal-header">
            <h1>Portal do Beneficiário</h1>
          </div>
          <div className="signup-card">
            <h2>Dados do <br /> Beneficiário</h2>
            <form onSubmit={handleSubmit}>
              <label className="label-input" htmlFor="guideNumber">Número da guia</label>
              <input id="guideNumber" name="guideNumber" className="signup-input" placeholder="12321324673" value={formValues.guideNumber} onChange={handleChange} required />

              <label className="label-input" htmlFor="cpf">CPF</label>
              <input id="cpf" name="cpf" className="signup-input" placeholder="000.000.000-00" value={formValues.cpf} onChange={handleChange} required />

              <label className="label-input" htmlFor="birthDate">Data de nascimento</label>
              <input id="birthDate" name="birthDate" className="signup-input" placeholder="25/08/1990" value={formValues.birthDate} onChange={handleChange} required />

              <label className="label-input" htmlFor="fullName">Nome</label>
              <input id="fullName" name="fullName" className="signup-input" placeholder="Maria Oliveira Santos" value={formValues.fullName} onChange={handleChange} required />

              <label className="label-input" htmlFor="phone">Telefone/Celular</label>
              <input id="phone" name="phone" className="signup-input" placeholder="(11) 99859-0459" value={formValues.phone} onChange={handleChange} required />

              <label className="label-input" htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" className="signup-input" placeholder="email@email.com" value={formValues.email} onChange={handleChange} required />

              <label className="label-input" htmlFor="password">Senha</label>
              <input id="password" name="password" type="password" className="signup-input" value={formValues.password} onChange={handleChange} required />

              <label className="label-input" htmlFor="confirmPassword">Confirmar senha</label>
              <input id="confirmPassword" name="confirmPassword" type="password" className="signup-input" value={formValues.confirmPassword} onChange={handleChange} required />

              {validationMessage && <small className="signup-feedback signup-feedback--validation">{validationMessage}</small>}
              {errorMessage && <small className="signup-feedback signup-feedback--error">{errorMessage}</small>}

              <Button type="submit" variant="primary" disabled={isSubmitDisabled}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>

            <div className="signup-footer">
              Já possui uma conta? <a onClick={onBackToLogin}>Fazer login</a>
            </div>
          </div>
        </div>
      </div>
      <div className="signup-right">
        <img src="/images/login-background.jpg" alt="Cadastro" />
      </div>
    </div>
  );
}
