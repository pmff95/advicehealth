import "./MobileHeader.css";

export interface MobileHeaderProps {
  userName: string;
  cardNumber: string;
  operator: string;
  open: boolean;
  onToggle: () => void;
}

export default function MobileHeader({
  userName,
  cardNumber,
  operator,
  open,
  onToggle,
}: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <div className="mobile-header-top">
        {!open && (
          <div
            className="titulo"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <img
              src="/svg/coracao.svg"
              alt="Avatar"
              style={{ width: "24px", height: "24px" }}
            />
            <h3>Portal do Beneficiário</h3>
          </div>
        )}

        <button
          className="menu-button"
          onClick={onToggle}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {!open && (
        <div className="mobile-user-data">
          <img src="../../public/svg/avatar.svg" alt="" />
          <div className="mobile-user-text">
            <span className="user-greeting">Olá, {userName}!</span>
            <span>N° da carteirinha: {cardNumber}</span>
            <span>Operadora: {operator}</span>
          </div>
        </div>
      )}

      <nav className={`mobile-menu ${open ? "open" : ""}`}>
        <ul>
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img src="../../public/svg/guia-medica.svg" alt="" />
            <button>Consultar Guias</button>
          </li>
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img src="../../public/svg/paciente.svg" alt="" />

            <button>Meus Dados</button>
          </li>
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img src="../../public/svg/paciente.svg" alt="" />

            <button>Sair</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
