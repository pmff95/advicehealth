import "./SignupSuccess.css";

interface SignupSuccessProps {
  email: string;
  onResend?: () => void;
  onGoToLogin: () => void;
}

export default function SignupSuccess({ email, onResend, onGoToLogin }: SignupSuccessProps) {
  return (
    <div className="success-page">
      <div className="success-left">
        <div className="success-container">
          <div className="portal-header">
            <h1>Portal do Beneficiário</h1>
          </div>

          <div className="success-card">
            <div className="email-icon" aria-hidden>
              <div className="email-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="white"
                stroke="#0c4171"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                <polyline points="22,5 12,13 2,5" />
              </svg>
            </div>

            </div>
            <h2>Cadastro realizado com sucesso!</h2>
            <p>
              Para continuar, clique no link enviado para <strong>{email}</strong>.
            </p>
          </div>

          <div className="success-footer">
            <p>
              Não está vendo o e-mail na sua caixa de entrada?{" "}
              <a onClick={onResend}>Tentar enviar novamente</a>
            </p>

            <button className="success-login-button" onClick={onGoToLogin}>
              Entrar no Sistema
            </button>
          </div>
        </div>
      </div>

      <div className="success-right">
        <img src="/images/login-background.jpg" alt="Cadastro" />
      </div>
    </div>
  );
}
