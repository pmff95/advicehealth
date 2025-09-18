import "./BeneficiaryCard.css";
import Button from "./Button";
import { useState } from "react";
import { formatCPF, formatPhone } from "../utils/formatters";

interface BeneficiaryCardProps extends React.HTMLAttributes<HTMLElement> {
  cpf: string;
  name: string;
  birthDate: string;
  isMobileMenuOpen?: boolean;
  phones?: string[];
  emails?: string[];
}

export default function BeneficiaryCard({
  name,
  birthDate,
  cpf,
  phones = [],
  emails = [],
  className = "",
}: BeneficiaryCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name,
    birthDate,
    cpf,
    phones: phones.length ? phones : [""],
    emails: emails.length ? emails : [""],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number
  ) => {
    const { value } = e.target;

    if (field === "phones" && typeof index === "number") {
      const updated = [...formData.phones];
      updated[index] = value;
      setFormData((prev) => ({ ...prev, phones: updated }));
      return;
    }

    if (field === "emails" && typeof index === "number") {
      const updated = [...formData.emails];
      updated[index] = value;
      setFormData((prev) => ({ ...prev, emails: updated }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const addPhone = () =>
    setFormData((prev) => ({ ...prev, phones: [...prev.phones, ""] }));
  const addEmail = () =>
    setFormData((prev) => ({ ...prev, emails: [...prev.emails, ""] }));

  const handleSave = () => {
    console.log("Salvando alterações:", formData);
    // TODO: enviar pro backend
    setIsEditing(false);
  };

  return (
    <aside className={`beneficiary-card ${className}`}>
      <div className="body_card_dashboard">
        {/* CPF */}
        <div className="input-group with-spacing">
          <label>CPF</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.cpf}
              onChange={(e) => handleChange(e, "cpf")}
              placeholder="000.000.000-00"
            />
          ) : (
            <p>{formatCPF(formData.cpf)}</p>
          )}
        </div>

        {/* Data de nascimento */}
        <div className="input-group with-spacing">
          <label>DATA DE NASCIMENTO</label>
          <p>{formData.birthDate}</p>
        </div>

        {/* Nome */}
        <div className="input-group with-spacing">
          <label>NOME</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange(e, "name")}
            />
          ) : (
            <p>{formData.name}</p>
          )}
        </div>

        {/* Telefones */}
        <div className="input-group">
          <label>TELEFONE/CELULAR</label>
          {formData.phones.map((phone, idx) =>
            isEditing ? (
              <input
                key={`phone-${idx}`} // ✅ chave única
                type="text"
                value={phone}
                onChange={(e) => handleChange(e, "phones", idx)}
                placeholder="(11) 99999-9999"
              />
            ) : (
              <p key={`phone-${idx}`}>{formatPhone(phone)}</p>
            )
          )}
          {isEditing && (
            <div className="button-group">
              <Button variant="tertiary" onClick={addPhone}>
                + Adicionar contato
              </Button>
            </div>
          )}
        </div>

        {/* Emails */}
        <div className="input-group">
          <label>E-MAIL</label>
          {formData.emails.map((email, idx) =>
            isEditing ? (
              <input
                key={`email-${idx}`} // ✅ chave única
                type="email"
                value={email}
                onChange={(e) => handleChange(e, "emails", idx)}
                placeholder="email@email.com"
              />
            ) : (
              <p key={`email-${idx}`}>{email}</p>
            )
          )}
          {isEditing && (
            <div className="button-group">
              <Button variant="tertiary" onClick={addEmail}>
                + Adicionar contato
              </Button>
            </div>
          )}
        </div>

        {/* Botão final */}
        {isEditing ? (
          <Button variant="secondary" onClick={handleSave}>
            Salvar
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Atualizar dados do titular
          </Button>
        )}
      </div>
    </aside>
  );
}
