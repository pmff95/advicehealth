import { useEffect, useState, useRef } from "react";
import { validateToken } from "../utils/api";
import "./CompleteRegistration.css";

export default function CompleteRegistration() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? "";

  const [status, setStatus] = useState<
    "loading" | "success" | "expired" | "not_found" | "error"
  >("loading");
  const [message, setMessage] = useState<string>("");

  const hasConfirmedRef = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("not_found");
      setMessage("Token não encontrado.");
      return;
    }

    if (hasConfirmedRef.current) return;
    hasConfirmedRef.current = true;

    const confirmToken = async () => {
      try {
        await validateToken(token, "/registration/confirm-complete-registration");
        setStatus("success");
        setMessage("Cadastro finalizado com sucesso!");
      } catch (err) {
        let msg = "Erro ao finalizar cadastro.";

        if (err instanceof Error) {
          msg = err.message;
        } else if (typeof err === "string") {
          msg = err;
        }

        if (msg.toLowerCase().includes("expired")) {
          setStatus("expired");
          setMessage("Link expirou. Solicite um novo e-mail de confirmação.");
        } else if (msg.toLowerCase().includes("not found")) {
          setStatus("not_found");
          setMessage("Usuário não encontrado.");
        } else {
          setStatus("error");
          setMessage(msg);
        }
      }
    };

    confirmToken();
  }, [token]);

  const handleGoToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="complete-page">
      <header className="complete-header">
        <h1>Portal do Beneficiário</h1>
      </header>

      <main
        className="complete-card"
        aria-labelledby="complete-registration-title"
      >
        <div
          className={`complete-card__icon ${
            status === "loading" ? "loading" : ""
          }`}
          aria-hidden
        >
          {status !== "loading" && (
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
          )}
        </div>

        <h2 id="complete-registration-title">
          {status === "loading"
            ? "Validando link..."
            : status === "success"
            ? "Cadastro finalizado!"
            : "Erro!"}
        </h2>
        <p>{status !== "loading" ? message : ""}</p>
      </main>

      {status !== "loading" && (
        <footer className="complete-footer">
          {status === "success" && (
            <button
              className="complete-login-button"
              onClick={handleGoToLogin}
            >
              Entrar no sistema
            </button>
          )}
        </footer>
      )}
    </div>
  );
}
