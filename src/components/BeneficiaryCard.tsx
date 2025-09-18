import "./BeneficiaryCard.css";
import Button from "./Button";

interface BeneficiaryCardProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  birthDate: string;
  phone: string;
  email: string;
  isMobileMenuOpen?: boolean;
}

export default function BeneficiaryCard({
  name,
  birthDate,
  phone,
  email,
  className = "",
  ...rest
}: BeneficiaryCardProps) {
  return (
    <aside className={`beneficiary-card ${className}`} {...rest}>
      <div className="body_card_dashboard">
        <div className="input-group with-spacing">
          <label>NOME</label>
          <p>{name}</p>
        </div>
        <div className="input-group with-spacing">
          <label>DATA DE NASCIMENTO</label>
          <p>{birthDate}</p>
        </div>
        <div className="input-group">
          <label>TELEFONE/CELULAR</label>
          <p>{phone}</p>
        </div>
        <div className="button-group">
          <Button variant="tertiary">Telefone adicional</Button>
        </div>
        <div className="input-group">
          <label>E-MAIL</label>
          <p>{email}</p>
        </div>
        {/* Aqui nesse de baixo */}
        <div className="button-group">
          <Button variant="tertiary">E-mail adicional</Button>
        </div>
        <Button variant="secondary">Atualizar dados do titular</Button>
      </div>
    </aside>
  );
}
