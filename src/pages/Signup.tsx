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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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

  // 🟢 Novos estados de erro de campo
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [birthError, setBirthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    trimmedFormValues.password.length < 8;
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
      return "A senha deve conter pelo menos 8 caracteres.";
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

  // 🟢 valida CPF com dígitos verificadores
  const validarCpf = (cpf: string) => {
    cpf = digitsOnly(cpf);
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    let maskedValue = value;
    if (name === "cpf") {
      maskedValue = maskCpf(value);
      const digits = digitsOnly(maskedValue);
      if (digits.length < 11) {
        setCpfError("CPF incompleto.");
      } else if (!validarCpf(digits)) {
        setCpfError("CPF inválido.");
      } else {
        setCpfError(null);
      }
    }

    if (name === "phone") maskedValue = maskPhone(value);

    if (name === "birthDate") {
      maskedValue = maskBirthDate(value);
      const digits = digitsOnly(maskedValue);
      if (digits.length === 8) {
        const [day, month, year] = [
          digits.slice(0, 2),
          digits.slice(2, 4),
          digits.slice(4),
        ];
        const birth = new Date(`${year}-${month}-${day}`);
        const today = new Date();
        if (birth > today) {
          setBirthError("A data de nascimento não pode ser maior que hoje.");
        } else {
          setBirthError(null);
        }
      } else {
        setBirthError("Informe a data completa (dd/mm/aaaa).");
      }
    }

    setHasInteracted(true);
    setFormValues((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const isSubmitDisabled: boolean =
    Boolean(isSubmitting) ||
    Boolean(hasEmptyRequiredFields) ||
    Boolean(passwordTooShort) ||
    Boolean(passwordsMismatch) ||
    Boolean(cpfError) ||
    Boolean(birthError);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setHasInteracted(true);
    setErrorMessage("");

    if (
      hasEmptyRequiredFields ||
      passwordTooShort ||
      passwordsMismatch ||
      cpfError ||
      birthError
    )
      return;

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
              <div style={{ marginBottom: "1rem" }}>
                <label className="label-input" htmlFor="guideNumber">
                  Número da guia
                </label>
                <input
                  id="guideNumber"
                  name="guideNumber"
                  className="signup-input"
                  placeholder="Número da Guia"
                  value={formValues.guideNumber}
                  onChange={handleChange}
                  required
                  disabled // 🔒 campo desativado
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
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
                  disabled // 🔒 campo desativado
                />
                {cpfError && <small style={{ color: "red" }}>{cpfError}</small>}
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label className="label-input" htmlFor="birthDate">
                  Data de nascimento
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  className="signup-input"
                  placeholder="dd/mm/aaaa"
                  value={formValues.birthDate}
                  onChange={handleChange}
                  required
                  disabled // 🔒 campo desativado
                />
                {birthError && (
                  <small style={{ color: "red" }}>{birthError}</small>
                )}
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label className="label-input" htmlFor="fullName">
                  Nome
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  className="signup-input"
                  placeholder="Digite seu nome..."
                  value={formValues.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label className="label-input" htmlFor="phone">
                  Telefone/Celular
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="signup-input"
                  placeholder="(11) 0 0000-0000"
                  value={formValues.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
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
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label className="label-input" htmlFor="password">
                  Senha
                </label>
                {/* 🔹 wrapper com olho */}
                <div className="password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="signup-input"
                    value={formValues.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label className="label-input" htmlFor="confirmPassword">
                  Confirmar senha
                </label>
                {/* 🔹 wrapper com olho */}
                <div className="password-wrapper">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="signup-input"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>

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
