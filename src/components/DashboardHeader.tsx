import "./DashboardHeader.css";

interface DashboardHeaderProps {
  title: string;
  userName: string;
  cardNumber: string;
  operator: string;
}

export default function DashboardHeader({ title, userName, cardNumber, operator }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      <h2>{title}</h2>
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

