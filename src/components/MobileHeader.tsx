import { useState } from "react";
import "./MobileHeader.css";

interface MobileHeaderProps extends React.HTMLAttributes<HTMLElement> {
  userName: string;
  cardNumber: string;
  operator: string;
}

export default function MobileHeader({
  userName,
  cardNumber,
  operator,
  className = "",
  ...rest
}: MobileHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`mobile-header ${className}`} {...rest}>
      <div className="mobile-header-top">
        <h2>Portal do Beneficiário</h2>
        <button
          className="menu-button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      <div className="mobile-user-data">
        <div className="avatar">👤</div>
        <div className="mobile-user-text">
          <span className="user-greeting">Olá, {userName}!</span>
          <span>N° da carteirinha: {cardNumber}</span>
          <span>Operadora: {operator}</span>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu">
          <button
            className="close-button"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>
          <ul>
            <li>
              <button>Consultar Guias</button>
            </li>
            <li>
              <button>Meus Dados</button>
            </li>
            <li>
              <button>Sair</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
