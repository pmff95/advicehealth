import { useState } from "react";
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
    } catch (err: unknown) {
      if (err instanceof Error) setErrorMessage(err.message);
      else setErrorMessage("Erro ao enviar e-mail. Tente novamente.");
    } finally {
      setLoading(false);
    }
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
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Enviando..." : "Enviar e-mail"}
        </Button>
      </div>
    </>
  );
}
