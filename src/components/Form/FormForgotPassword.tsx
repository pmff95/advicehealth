import { useState, useEffect } from "react";
import Button from "../../components/Button/Button";

interface FormForgotPasswordProps {
  onBackToLogin: () => void;
  onSendEmail: (email: string) => Promise<void>;
}

export default function FormForgotPassword({
  onBackToLogin,
  onSendEmail,
}: FormForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cooldown, setCooldown] = useState(0); // 🕒 contador de bloqueio
  const [emailSent, setEmailSent] = useState(false); // ✅ controla se o email já foi enviado

  // ⏳ controla o timer (decrementa a cada segundo)
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Informe seu e-mail para redefinir a senha.");
      return;
    }

    setLoading(true);
    try {
      await onSendEmail(email);
      setSuccessMessage("E-mail de redefinição enviado com sucesso!");
      setEmailSent(true);
      setCooldown(60); // 🕒 bloqueia reenvio por 60 segundos
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage("Erro ao enviar e-mail. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 permite reenviar após cooldown acabar
  const handleResend = async () => {
    if (cooldown > 0) return;
    await handleSubmit();
  };

  return (
    <>
      <h2>Recuperar senha</h2>
      <p>Digite seu e-mail para receber o link de redefinição.</p>

      <input
        type="email"
        className="login-input"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {errorMessage && (
        <small style={{ color: "#dc3545" }}>{errorMessage}</small>
      )}
      {successMessage && (
        <small style={{ color: "#28a745" }}>{successMessage}</small>
      )}

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onBackToLogin} severity="secondary">
          Voltar ao login
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={loading || (emailSent && cooldown > 0)}
        >
          {loading
            ? "Enviando..."
            : emailSent && cooldown > 0
            ? "E-mail enviado"
            : "Enviar e-mail"}
        </Button>
      </div>

      {/* 🟢 Mensagem de reenvio abaixo do botão */}
      {emailSent && (
        <div style={{ marginTop: "1rem" }}>
          {cooldown > 0 ? (
            <small style={{ color: "#666" }}>
              Não recebeu o e-mail? Aguarde {cooldown}s para reenviar.
            </small>
          ) : (
            <small>
              Não recebeu o e-mail?{" "}
              <button
                type="button"
                onClick={handleResend}
                style={{
                  background: "none",
                  border: "none",
                  color: "#0d6efd",
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: 0,
                  fontSize: "0.9rem",
                }}
              >
                Clique aqui para reenviar.
              </button>
            </small>
          )}
        </div>
      )}
    </>
  );
}
