import "./Login.css";
import Button from "../components/Button";
import { IMaskInput } from "react-imask";
import { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [cpfOrDate, setCpfOrDate] = useState("");

  return (
    <div className="login-page">
      <div className="login-teste">
        <div className="portal-header">
          <img src="../../public/svg/coracao.svg" alt="" />
          <h1>Portal do Beneficiário</h1>
        </div>
        <div className="login-card">
          <div className="header">
            <h2>Login</h2>
            <small>
              Entre com seus dados corretamente para acessar nossa plataforma.
            </small>
          </div>
          <div className="body-card_login">
            <label>Data de Nascimento / CPF</label>
            <IMaskInput
              style={{ marginBottom: "1.5rem" }}
              className="login-input"
              mask={[
                { mask: "00/00/0000" }, // Data
                { mask: "000.000.000-00" }, // CPF
              ]}
              value={cpfOrDate}
              onAccept={(value: string) => setCpfOrDate(value)}
              placeholder="Data de nascimento ou CPF"
              dispatch={(appended, dynamicMasked) => {
                const value = (dynamicMasked.value + appended).replace(
                  /\D/g,
                  ""
                );
                // até 8 dígitos → Data
                if (value.length <= 8) {
                  return dynamicMasked.compiledMasks[0];
                }
                // mais que 8 → CPF
                return dynamicMasked.compiledMasks[1];
              }}
            />

            <label>Senha</label>
            <input
              style={{ marginBottom: "1.5rem" }}
              type="password"
              placeholder="********"
            />

            <div className="login-options">
              <label className="remember">
                <input type="checkbox" /> Lembrar senha
              </label>
              <a href="#">Esqueci minha senha</a>
            </div>

            <Button variant="primary" onClick={onLogin}>
              Login
            </Button>

            <div className="signup">
              Ainda não tem conta? <a href="#">Cadastre-se</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
