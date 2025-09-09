import "./Header.css";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  userName: string;
  cardNumber: string;
  operator: string;
}

export default function Header({
  userName,
  cardNumber,
  // operator,
  className = "",
  ...rest
}: HeaderProps) {
  return (
    <header className={`dashboard-header ${className}`} {...rest}>
      <h2>Portal do Beneficiário</h2>

      {/* user info + imagem */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div className="user-info">
          <span className="user-greeting">Olá, {userName}!</span>
          <span>N° da carteirinha: {cardNumber}</span>
          {/* <span>Operadora: {operator}</span> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".2rem",
            alignItems: "center",
          }}
        >
          <img
            src="/svg/avatar.svg"
            alt="Avatar do usuário"
            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
          />
          <a href="/">Sair</a>
        </div>
      </div>
    </header>
  );
}
