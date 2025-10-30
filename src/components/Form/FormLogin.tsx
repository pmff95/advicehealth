import { useState, type FormEvent } from "react";
import Button from "../../components/Button/Button";
import { authenticate, fetchCurrentUser } from "../../utils/api";
import { storeToken } from "../../utils/auth";
import type { UserProfile } from "../../types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface FormLoginProps {
  onLogin: (user: UserProfile) => void;
  onShowForgotPassword: () => void;
  onNavigateToSignup: () => void;
}

export default function FormLogin({
  onLogin,
  onShowForgotPassword,
  onNavigateToSignup,
}: FormLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 🔹 novo estado

  const handleLoginSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Informe o e-mail e a senha para continuar.");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = await authenticate(email, password);
      const user = await fetchCurrentUser(token);
      storeToken(token);
      onLogin(user);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro ao autenticar. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <span style={{ margin: ".5rem 0 1.5rem" }}>
        Acesse e acompanhe o status das guias solicitadas para o seu
        <strong> plano de saúde</strong>.
      </span>

      <form onSubmit={handleLoginSubmit}>
        <label className="label-input">E-mail</label>
        <input
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          type="email"
          autoComplete="username"
        />

        <label className="label-input" style={{ marginTop: "1.5rem" }}>
          Senha
        </label>

        {/* 🔹 wrapper adicionado apenas para o olho */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"} // 🔹 alterna tipo
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="toggle-password" // 🔹 novo botão
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />{" "}
            {/* 🔹 */}
          </button>
        </div>

        <div className="login-options">
          <label className="remember">
            <input type="checkbox" /> Lembrar senha
          </label>
          <a onClick={onShowForgotPassword}>Esqueci minha senha</a>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {errorMessage && (
            <small style={{ color: "#dc3545" }}>{errorMessage}</small>
          )}
          <Button
            type="submit"
            severity="primary"
            style={{ width: "100%" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </form>

      <div className="signup">
        Ainda não tem conta? <a onClick={onNavigateToSignup}>Cadastre-se</a>
      </div>
    </>
  );
}
