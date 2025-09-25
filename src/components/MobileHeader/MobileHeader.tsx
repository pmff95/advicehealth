import "./MobileHeader.css";

export interface MobileHeaderProps {
  userName: string;
  cardNumber: string;
  operator: string;
  open: boolean;
  onToggle: () => void;
  onSelectDashboard: () => void;
  onSelectProfile: () => void;
  onLogout: () => void;
}

export default function MobileHeader({
  open,
  onToggle,
  onSelectDashboard,
  onSelectProfile,
  onLogout,
}: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <div className="mobile-header-top">
        {!open && <h3>Portal do Beneficiário</h3>}

        <button
          className="menu-button"
          onClick={onToggle}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <nav className={`mobile-menu ${open ? "open" : ""}`}>
        <ul>
          <li>
            <img src="../../public/svg/guia-medica.svg" alt="" />
            <button onClick={onSelectDashboard}>Consultar Guias</button>
          </li>
          <li>
            <img src="../../public/svg/paciente.svg" alt="" />
            <button onClick={onSelectProfile}>Meus Dados</button>
          </li>
        </ul>
      </nav>

      {!open && (
        <div className="logout-container">
          <button className="logout-button" onClick={onLogout}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
