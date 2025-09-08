import "./Login.css";
import Button from "../components/Button";

interface LoginProps {
  onLogin: () => void;
}
export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="login-page">
      <div className="login-teste">
        <div className="portal-header">
          <h1>Portal do Beneficiário</h1>
        </div>
        <div className="login-card">
          <div className="header ">
            <h2>Login</h2>
            <small>
              Entre com seus dados corretamente para acessar nossa plataforma.
            </small>
          </div>
          <div className="body-card_login">
            <label>CPF</label>
            <input
              style={{ marginBottom: "1.5rem" }}
              type="text"
              placeholder="000.000.000-00"
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
