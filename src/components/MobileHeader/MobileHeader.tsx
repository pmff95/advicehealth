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
  userName,
  // cardNumber,
  // operator,
  open,
  onToggle,
  onSelectDashboard,
  onSelectProfile,
  onLogout,
}: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <div className="mobile-header-top">
        {!open && <h4>Portal do Beneficiário</h4>}

        <div className="menu-stack">
          <button
            className="menu-button"
            onClick={onToggle}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? "✕" : "☰"}
          </button>

          {!open && (
            <button className="logout-button" onClick={onLogout}>
              Sair
            </button>
          )}
        </div>
      </div>

      {!open && (
        <div className="mobile-user-info">
          <h2 style={{ fontWeight: 500 }}>Olá, {userName}!</h2>
          <span>
            Consulte o status das autorizações <br /> do seu plano
          </span>
        </div>
      )}

      <nav className={`mobile-menu ${open ? "open" : ""}`}>
        <ul>
          <li onClick={onSelectDashboard}>
            <img src="../../public/svg/guia-medica.svg" alt="" />
            <button>Consultar Guias</button>
          </li>
          <li onClick={onSelectProfile}>
            <img src="../../public/svg/paciente.svg" alt="" />
            <button>Meus Dados</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
