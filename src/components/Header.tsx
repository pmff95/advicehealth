import "./Header.css";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  userName: string;
  cardNumber: string;
  operator: string;
}

export default function Header({
  userName,
  cardNumber,
  operator,
  className = "",
  ...rest
}: HeaderProps) {
  return (
    <header className={`dashboard-header ${className}`} {...rest}>
      <h2>Portal do Beneficiário</h2>
      <div className="user-info">
        <span className="user-greeting">Olá, {userName}!</span>
        <span>N° da carteirinha: {cardNumber}</span>
        <span>Operadora: {operator}</span>
      </div>
    </header>
  );
}
