import "./Login.css";
import Button from "../components/Button";
import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [cpfOrDate] = useState("");

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="login-left">
        <div className="login-page">
          <div className="portal-header">
            <h1>Portal do Beneficiário</h1>
          </div>
          <div className="login-card">
            <h2>Login</h2>
            <span>
              Acesse e acompanhe o status das guias solicitadas para o seu
              <strong> plano de saúde</strong>.
            </span>
            <label className="label-input">E-mail</label>
            <input
              style={{ marginBottom: "1.5rem" }}
              className="login-input"
              value={cpfOrDate}
              placeholder="email@mail.com"
            />

            <label className="label-input">Senha</label>
            <input
              style={{ marginBottom: "1.5rem" }}
              type="password"
              placeholder="Digite sua senha"
            />

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" /> Lembrar senha
              </label>
              <a href="#">Esqueci minha senha</a>
            </div>

            <Button variant="primary" onClick={onLogin}>
              Entrar
            </Button>

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
