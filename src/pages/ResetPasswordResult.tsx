import "./ResetPassword.css"; 

interface ResetPasswordResultProps {
  success: boolean;
  message: string;
  onBackToLogin?: () => void; 
}

export default function ResetPasswordResult({
  success,
  message,
  onBackToLogin,
}: ResetPasswordResultProps) {
  return (
    <div className="reset-page">
      <header className="reset-header">
        <h1>Portal do Beneficiário</h1>
      </header>

      <main className="reset-card" aria-labelledby="reset-result-title">
        <h2 id="reset-result-title">
          {success ? "Sucesso!" : "Ops!"}
        </h2>

        <p style={{ color: success ? "green" : "red" }}>{message}</p>

        <button className="success-login-button" onClick={onBackToLogin}>
          Voltar ao login
        </button>
      </main>
    </div>
  );
}
