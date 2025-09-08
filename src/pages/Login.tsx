import './Login.css'

interface LoginProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginProps) {
  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Portal do Beneficiário</h1>
        <div className="login-card">
          <h2>Login</h2>
          <p>Entre com seus dados corretamente para acesso nossa plataforma.</p>
          <label>CPF</label>
          <input type="text" placeholder="000.000.000-00" />
          <label>Senha</label>
          <input type="password" placeholder="********" />
          <div className="login-options">
            <label className="remember">
              <input type="checkbox" /> Lembrar senha
            </label>
            <a href="#">Esqueci minha senha</a>
          </div>
          <button onClick={onLogin}>Login</button>
          <div className="signup">
            Ainda não tem conta? <a href="#">Cadastre-se</a>
          </div>
        </div>
      </div>
      <div className="login-image" />
    </div>
  )
}

