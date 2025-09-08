import "./Header.css";

interface HeaderProps {
  userName: string;
  cardNumber: string;
  operator: string;
}

export default function Header({
  userName,
  cardNumber,
  operator,
}: HeaderProps) {
  return (
    <header className="dashboard-header">
      <h2>Portal do Beneficiário</h2>
      <div className="user-info">
        Olá, {userName}!
        <br />
        N° da carteirinha: {cardNumber}
        <br />
        Operadora: {operator}
      </div>
    </header>
  );
}
