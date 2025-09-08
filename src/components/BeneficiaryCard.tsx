import "./BeneficiaryCard.css";
import Button from "./Button";

interface BeneficiaryCardProps {
  name: string;
  birthDate: string;
  phone: string;
  email: string;
}

export default function BeneficiaryCard({
  name,
  birthDate,
  phone,
  email,
}: BeneficiaryCardProps) {
  return (
    <aside className="beneficiary-card">
      <div className="header">
        <h3>Dados do Beneficiário</h3>
      </div>
      <div className="body_card_dashboard">
        <div className="input-group" style={{ marginBottom: "1.5rem" }}>
          <label>NOME</label>
          <p>{name}</p>
        </div>
        <div className="input-group" style={{ marginBottom: "1.5rem" }}>
          <label>DATA DE NASCIMENTO</label>
          <p>{birthDate}</p>
        </div>
        <div className="input-group">
          <label>TELEFONE/CELULAR</label>
          <p>{phone}</p>
        </div>
          <div className="button-group">
            <Button variant="tertiary" style={{ marginBottom: "1rem" }}>
              Telefone adicional
            </Button>
          </div>
        <div className="input-group">
          <label>E-MAIL</label>
          <p>{email}</p>
        </div>
          <div className="button-group">
            <Button variant="tertiary">E-mail adicional</Button>
          </div>
          <Button variant="secondary">Atualizar dados do titular</Button>
        </div>
      </aside>
    );
  }
