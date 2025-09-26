/* eslint-disable no-debugger */
import type { FormEvent } from "react";
import { useState } from "react";
import "./Login.css";
import Button from "../components/Button/Button";
import { authenticate, fetchCurrentUser } from "../utils/api";
import { storeToken } from "../utils/auth";
import type { UserProfile } from "../types/user";

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
        debugger;
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro ao autenticar. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="login-left">
        <div className="login-page">
          <div className="portal-header">
            <h1>Portal do Beneficiário</h1>
          </div>
          <div className="login-card">
            <h2>Login</h2>
            <span style={{ marginBottom: "2rem" }}>
              Acesse e acompanhe o status das guias solicitadas para o seu
              <strong> plano de saúde</strong>.
            </span>
            <form onSubmit={handleSubmit}>
              <label className="label-input">E-mail</label>
              <input
                style={{ marginBottom: "1.5rem" }}
                className="login-input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@mail.com"
                type="email"
                autoComplete="username"
              />

              <label className="label-input">Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />

              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" /> Lembrar senha
                </label>
                <a href="#">Esqueci minha senha</a>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                {errorMessage ? (
                  <small style={{ color: "#dc3545" }}>{errorMessage}</small>
                ) : null}

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </form>

            <div className="signup">
              Ainda não tem conta? <a href="#">Cadastre-se</a>
            </div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src="/images/login-background.jpg" alt="Login" />
      </div>
    </div>
  );
}
