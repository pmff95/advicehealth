import { useState } from "react";
import { sendPasswordResetEmail } from "../utils/api";
import Button from "../components/Button/Button";
import "./ForgotPassword.css";

interface ForgotPasswordProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
}

export default function ForgotPassword({ onBack, onSuccess }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!email) {
      setErrorMessage("Informe seu e-mail.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(email);
      onSuccess(email); 
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage("Erro ao enviar e-mail. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-left">
        <div className="forgot-container">
          <div className="portal-header">
            <h1>Portal do Beneficiário</h1>
          </div>
          <div className="forgot-card">
            <h2>Recuperar senha</h2>
            <p>Digite seu e-mail para receber um link de redefinição de senha.</p>

            <input
              type="email"
              className="forgot-input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {errorMessage && <small>{errorMessage}</small>}

            <Button onClick={handleSubmit} disabled={loading} style={{ marginTop: "1rem" }}>
              {loading ? "Enviando..." : "Enviar e-mail"}
            </Button>

            <Button onClick={onBack} severity="secondary" style={{ marginTop: "0.5rem" }}>
              Voltar
            </Button>
          </div>
        </div>
      </div>

      <div className="forgot-right">
        <img src="/images/login-background.jpg" alt="Recuperação" />
      </div>
    </div>
  );
}
