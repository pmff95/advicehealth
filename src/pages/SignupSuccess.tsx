import "./SignupSuccess.css";

interface SignupSuccessProps {
  email: string;
  onResend?: () => void;
  onGoToLogin: () => void;
}

export default function SignupSuccess({ email, onResend, onGoToLogin }: SignupSuccessProps) {
  const isResendAvailable = typeof onResend === "function";

  return (
    <div className="success-page">
      <header className="success-header">
        <h1>Portal do Beneficiário</h1>
      </header>

      <main className="success-card" aria-labelledby="signup-success-title">
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

        <h2 id="signup-success-title">Cadastro realizado com sucesso!</h2>
        <p>
          Para continuar, clique no link enviado para <strong>{email}</strong>.
        </p>
      </main>

      <footer className="success-footer">
        <p>
          Não está vendo o e-mail na sua caixa de entrada?{" "}
          {isResendAvailable ? (
            <button type="button" className="success-footer__link" onClick={onResend}>
              Tentar enviar novamente
            </button>
          ) : (
            <span className="success-footer__placeholder">Tentar enviar novamente</span>
          )}
        </p>

        <button className="success-login-button" onClick={onGoToLogin}>
          Entrar no sistema
        </button>
      </footer>
    </div>
  );
}
