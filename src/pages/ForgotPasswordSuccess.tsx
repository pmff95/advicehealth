import { useState, useEffect } from "react";
import "./ForgotPasswordSuccess.css";
import { sendPasswordResetEmail } from "../utils/api";

interface ForgotPasswordSuccessProps {
  email: string;
  onGoToLogin: () => void;
}

export default function ForgotPasswordSuccess({
  email,
  onGoToLogin,
}: ForgotPasswordSuccessProps) {
  const [isSending, setIsSending] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [cooldown, setCooldown] = useState(0); // 🕒 tempo restante em segundos

  // ⏳ Decrementa o contador a cada segundo enquanto estiver ativo
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleResendClick = async () => {
    if (cooldown > 0 || isSending) return;

    setIsSending(true);
    try {
      await sendPasswordResetEmail(email);
      setSentMessage("E-mail reenviado com sucesso!");
      setCooldown(60); // 🕒 bloqueia reenvio por 60 segundos
      setTimeout(() => setSentMessage(""), 5000);
    } catch {
      setSentMessage("Erro ao reenviar e-mail. Tente novamente mais tarde.");
      setTimeout(() => setSentMessage(""), 5000);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="success-page">
      <header className="success-header">
        <h1>Portal do Beneficiário</h1>
      </header>

      <main className="success-card" aria-labelledby="forgot-success-title">
        <div className="success-card__icon" aria-hidden>
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="presentation"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
            <polyline points="22 5 12 13 2 5" />
          </svg>
        </div>
        <h2 id="forgot-success-title">E-mail enviado com sucesso!</h2>
        <p>
          Para continuar, clique no link enviado para <strong>{email}</strong>.
        </p>
      </main>

      <footer className="success-footer">
        <p>
          Não está vendo o e-mail na sua caixa de entrada?{" "}
          <button
            type="button"
            className="success-footer__link"
            onClick={handleResendClick}
            disabled={isSending || cooldown > 0}
          >
            {isSending
              ? "Enviando..."
              : cooldown > 0
              ? `Aguarde ${cooldown}s`
              : "Tentar enviar novamente"}
          </button>
        </p>
        {sentMessage && <p style={{ color: "white" }}>{sentMessage}</p>}

        <button className="success-login-button" onClick={onGoToLogin}>
          Voltar ao login
        </button>
      </footer>
    </div>
  );
}
