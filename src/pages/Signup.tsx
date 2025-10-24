import "./Signup.css";
import Button from "../components/Button/Button";
import { registerUser, sendPreRegistrationToken } from "../utils/api";
import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";
import SignupSuccess from "./SignupSuccess";
import {
  digitsOnly,
  formatBirthDateForApi,
  maskBirthDate,
  maskCpf,
  maskPhone,
} from "../utils/formatters";

interface SignupProps {
  onBackToLogin: () => void;
  beneficiaryData?: {
    cpf: string;
    guideNumber?: string;
    birthDate: string;
    fullName: string;
    email?: string;
    phone?: string;
  };
}

export default function Signup({
  onBackToLogin,
  beneficiaryData,
}: SignupProps) {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [signupCompleted, setSignupCompleted] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string>("");
  const [userUuid, setUserUuid] = useState<string>("");

  useEffect(() => {
    if (!beneficiaryData) return;

    setFormValues((prev) => ({
      ...prev,
      cpf: maskCpf(beneficiaryData.cpf),
      guideNumber: maskCpf(beneficiaryData.guideNumber ?? ""),
      birthDate: maskBirthDate(beneficiaryData.birthDate),
      fullName: beneficiaryData.fullName,
      email: beneficiaryData.email ?? "",
      phone: maskPhone(beneficiaryData.phone ?? ""),
    }));
  }, [beneficiaryData]);

  const trimmedFormValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(formValues).map(([k, v]) => [k, String(v).trim()])
    ) as Record<string, string>;
  }, [formValues]);

  const hasEmptyRequiredFields = useMemo(() => {
    const required = [
      "guideNumber",
      "cpf",
      "birthDate",
      "fullName",
      "phone",
      "email",
      "password",
      "confirmPassword",
    ];
    return required.some(
      (field) => !trimmedFormValues[field as keyof typeof trimmedFormValues]
    );
  }, [trimmedFormValues]);

  const passwordTooShort =
    trimmedFormValues.password.length > 0 &&
    trimmedFormValues.password.length < 6;
  const passwordsMismatch =
    trimmedFormValues.password &&
    trimmedFormValues.confirmPassword &&
    trimmedFormValues.password !== trimmedFormValues.confirmPassword;

  const validationMessage = useMemo(() => {
    if (
      (submitAttempted ||
        trimmedFormValues.password ||
        trimmedFormValues.confirmPassword) &&
      passwordTooShort
    ) {
      return "A senha deve conter pelo menos 6 caracteres.";
    }
    if (
      (submitAttempted || trimmedFormValues.confirmPassword) &&
      passwordsMismatch
    ) {
      return "As senhas não conferem.";
    }
    if ((submitAttempted || hasInteracted) && hasEmptyRequiredFields) {
      return "Preencha todos os campos obrigatórios.";
    }
    return "";
  }, [
    hasEmptyRequiredFields,
    hasInteracted,
    passwordTooShort,
    passwordsMismatch,
    submitAttempted,
    trimmedFormValues.password,
    trimmedFormValues.confirmPassword,
  ]);

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
    if (name === "birthDate") maskedValue = maskBirthDate(value);

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
      const formattedBirthDate = formatBirthDateForApi(
        trimmedFormValues.birthDate
      );

      const createdUser = await registerUser({
        name: trimmedFormValues.fullName,
        email: trimmedFormValues.email,
        phone: trimmedFormValues.phone
          ? digitsOnly(trimmedFormValues.phone)
          : undefined,
        cpf: trimmedFormValues.cpf
          ? digitsOnly(trimmedFormValues.cpf)
          : undefined,
        guide_number: trimmedFormValues.guideNumber || undefined,
        birth_date: formattedBirthDate,
        password: trimmedFormValues.password,
      });

      if (createdUser?.uuid) {
        setUserUuid(createdUser.uuid); 
        await sendPreRegistrationToken(createdUser.uuid, {
          email: trimmedFormValues.email,
          nome: trimmedFormValues.fullName,
        });
      }

      setRegisteredEmail(trimmedFormValues.email);
      setSignupCompleted(true);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!userUuid) return;
    try {
      setIsSubmitting(true);
      await sendPreRegistrationToken(userUuid, {
        email: registeredEmail,
        nome: trimmedFormValues.fullName,
      });
    } catch {
      setErrorMessage("Erro ao tentar reenviar o e-mail.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (signupCompleted) {
    return (
      <SignupSuccess
        email={registeredEmail}
        onGoToLogin={onBackToLogin}
        onResend={handleResend}
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
            <h2>
              Dados do <br /> Beneficiário
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="label-input" htmlFor="guideNumber">
                Número da guia
              </label>
              <input
                id="guideNumber"
                name="guideNumber"
                className="signup-input"
                placeholder="12321324673"
                value={formValues.guideNumber}
                onChange={handleChange}
                required
              />

              <label className="label-input" htmlFor="cpf">
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                className="signup-input"
                placeholder="000.000.000-00"
                value={formValues.cpf}
                onChange={handleChange}
                required
              />

              <label className="label-input" htmlFor="birthDate">
                Data de nascimento
              </label>
              <input
                id="birthDate"
                name="birthDate"
                className="signup-input"
                placeholder="25/08/1990"
                value={formValues.birthDate}
                onChange={handleChange}
                required
              />

              <label className="label-input" htmlFor="fullName">
                Nome
              </label>
              <input
                id="fullName"
                name="fullName"
                className="signup-input"
                placeholder="Maria Oliveira Santos"
                value={formValues.fullName}
                onChange={handleChange}
                required
              />

              <label className="label-input" htmlFor="phone">
                Telefone/Celular
              </label>
              <input
                id="phone"
                name="phone"
                className="signup-input"
                placeholder="(11) 99859-0459"
                value={formValues.phone}
                onChange={handleChange}
                required
              />

              <label className="label-input" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="signup-input"
                placeholder="email@email.com"
                value={formValues.email}
                onChange={handleChange}
                required
              />

              <label className="label-input" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="signup-input"
                value={formValues.password}
                onChange={handleChange}
                required
              />

              <label className="label-input" htmlFor="confirmPassword">
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="signup-input"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
              />

              {validationMessage && (
                <small style={{ color: "red" }}>{validationMessage}</small>
              )}
              {errorMessage && (
                <small style={{ color: "red" }}>{errorMessage}</small>
              )}

              <Button
                type="submit"
                severity="primary"
                style={{ marginTop: "1rem" }}
                disabled={isSubmitDisabled}
              >
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
