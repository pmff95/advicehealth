import { useState } from "react";
import "./MobileHeader.css";

interface MobileHeaderProps {
  userName: string;
  cardNumber: string;
  operator: string;
}

export default function MobileHeader({
  userName,
  cardNumber,
  operator,
}: MobileHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="mobile-header">
      <div className="mobile-header-top">
        {!open && <h3>Portal do Beneficiário</h3>}
        <button
          className="menu-button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {!open && (
        <div className="mobile-user-data">
          <div className="avatar">👤</div>
          <div className="mobile-user-text">
            <span className="user-greeting">Olá, {userName}!</span>
            <span>N° da carteirinha: {cardNumber}</span>
            <span>Operadora: {operator}</span>
          </div>
        </div>
      )}

      <nav className={`mobile-menu ${open ? "open" : ""}`}>
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
    </header>
  );
}
