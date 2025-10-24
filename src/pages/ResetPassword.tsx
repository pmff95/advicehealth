import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { validateToken, confirmPasswordReset } from "../utils/api";
import Button from "../components/Button/Button";
import "./ResetPassword.css";
import ResetPasswordResult from "./ResetPasswordResult";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean>(false);

  const [resetCompleted, setResetCompleted] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [passwordsMismatch, setPasswordsMismatch] = useState(false);

  const hasValidatedRef = useRef(false);

  useEffect(() => {
  if (!token) {
    setMessage("Token não encontrado.");
    return;
  }

  if (hasValidatedRef.current) return;
  hasValidatedRef.current = true;

  const validate = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await validateToken(token, "/forgot-password/check-password-reset");
      setTokenValid(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message); 
      } else {
        setMessage("Erro ao validar token.");
      }
    }
  };

  validate();
}, [token]);

  useEffect(() => {
    if (!password || !confirmPassword) {
      setPasswordsMismatch(false);
    } else {
      setPasswordsMismatch(password !== confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async () => {
    setMessage(null);

    if (!tokenValid) {
      setMessage("Token inválido ou expirado.");
      return;
    }

    if (!password || !confirmPassword) {
      setMessage("Informe a nova senha e a confirmação.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não conferem.");
      return;
    }

    if (password.length < 6) {
      setMessage("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await confirmPasswordReset(token, password);

      setResetCompleted({
        success: true,
        message: "Senha redefinida com sucesso!",
      });
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "Erro ao redefinir senha.";
      setResetCompleted({ success: false, message: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  if (resetCompleted) {
    return (
      <ResetPasswordResult
      success={resetCompleted.success}
      message={resetCompleted.message}
      onBackToLogin={() => (window.location.href = "/login")}
    />
    );
  }

  return (
    <div className="reset-page">
      <header className="reset-header">
        <h1>Portal do Beneficiário</h1>
      </header>

      <main className="reset-card" aria-labelledby="reset-password-title">
        <h2 id="reset-password-title">Redefinir senha</h2>

        {!tokenValid && <p>{message ?? "Validando link..."}</p>}

        {tokenValid && (
          <>
            <p>Informe sua nova senha.</p>

            <input
              type="password"
              className="reset-input"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              className="reset-input"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Mensagem de senha não confere em tempo real */}
            {passwordsMismatch && (
              <p style={{ color: "red" }}>As senhas não conferem.</p>
            )}

            {message && <p style={{ color: "red" }}>{message}</p>}

            <Button
              onClick={handleSubmit}
              disabled={loading || passwordsMismatch || !password || !confirmPassword}
            >
              {loading ? "Redefinindo..." : "Redefinir senha"}
            </Button>
          </>
        )}
      </main>
    </div>
  );
}
