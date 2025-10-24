import { formatCPF, formatPhone, maskPhone } from "../../utils/formatters";
import Button from "../Button/Button";
import "./BeneficiaryCard.css";
import { useMemo, useState } from "react";
import {
  addPhone,
  addEmail,
  togglePhone,
  toggleEmail,
} from "../../utils/api"; /* NOVO */
import { getStoredToken } from "../../utils/auth"; /* NOVO */

interface BeneficiaryCardProps extends React.HTMLAttributes<HTMLElement> {
  cpf: string;
  name: string;
  birthDate: string;
  phones?: { uuid?: string; number: string; is_active: boolean }[];
  emails?: { uuid?: string; email: string; is_active: boolean }[];
  isMobileMenuOpen?: boolean;
  onRefreshUser?: () => void; // 👈 NOVO
}

export default function BeneficiaryCard({
  name,
  birthDate,
  cpf,
  phones = [],
  emails = [],
  className = "",
  onRefreshUser,
}: BeneficiaryCardProps) {
  const formData = { name, birthDate, cpf, phones, emails };

  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showNewPhone, setShowNewPhone] = useState(false);
  const [showNewEmail, setShowNewEmail] = useState(false);

  const allPhones = useMemo(() => formData.phones || [], [formData.phones]);
  const allEmails = useMemo(() => formData.emails || [], [formData.emails]);

  const handleAddPhone = async () => {
    if (!newPhone.trim()) return;
    try {
      const token = getStoredToken();
      if (!token) throw new Error("Usuário não autenticado");

      await addPhone(token, newPhone.trim()); /* NOVO */
      alert("Telefone adicionado com sucesso!");
      setNewPhone("");
      setShowNewPhone(false);
      onRefreshUser?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao adicionar telefone");
    }
  };

  const handleAddEmail = async () => {
    if (!newEmail.trim()) return;
    try {
      const token = getStoredToken();
      if (!token) throw new Error("Usuário não autenticado");

      await addEmail(token, newEmail.trim()); /* NOVO */
      alert("E-mail adicionado com sucesso!");
      setNewEmail("");
      setShowNewEmail(false);
      onRefreshUser?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao adicionar e-mail");
    }
  };

  const handleTogglePhone = async (idx: number, checked: boolean) => {
    const phone = allPhones[idx];
    const ok = window.confirm(
      `${checked ? "Ativar" : "Inativar"} o telefone ${formatPhone(
        phone.number
      )}?`
    );
    if (!ok) return;

    try {
      const token = getStoredToken();
      if (!token) throw new Error("Usuário não autenticado");
      if (!phone.uuid)
        throw new Error("UUID do telefone não encontrado para atualização");

      await togglePhone(token, phone.uuid, checked);
      alert("Status do telefone atualizado!");
      onRefreshUser?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao alterar telefone");
    }
  };

  const handleToggleEmail = async (idx: number, checked: boolean) => {
    const email = allEmails[idx];
    const ok = window.confirm(
      `${checked ? "Ativar" : "Inativar"} o e-mail ${email.email}?`
    );
    if (!ok) return;

    try {
      const token = getStoredToken();
      if (!token) throw new Error("Usuário não autenticado");
      if (!email.uuid)
        throw new Error("UUID do e-mail não encontrado para atualização");

      await toggleEmail(token, email.uuid, checked);
      alert("Status do e-mail atualizado!");
      onRefreshUser?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao alterar e-mail");
    }
  };

  return (
    <aside className={`beneficiary-card ${className}`}>
      <div className="body_card_dashboard">
        <div className="input-group with-spacing">
          <label>CPF</label>
          <p>{formatCPF(formData.cpf)}</p>
        </div>

        <div className="input-group with-spacing">
          <label>DATA DE NASCIMENTO</label>
          <p>{formData.birthDate}</p>
        </div>

        <div className="input-group with-spacing">
          <label>NOME</label>
          <p>{formData.name}</p>
        </div>

        {/* Telefones */}
        <div className="input-group">
          <label>TELEFONE/CELULAR</label>
          {allPhones.map((p, idx) => (
            <div key={idx} className="phone-line">
              <p>{formatPhone(p.number)}</p>
              <div className="switch-line">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={p.is_active}
                    onChange={(ev) =>
                      handleTogglePhone(idx, ev.currentTarget.checked)
                    }
                  />
                  <span className="slider round"></span>
                </label>
                <small>
                  Este contato está {p.is_active ? "ativo" : "inativo"}
                </small>
              </div>
            </div>
          ))}

          {showNewPhone ? (
            <div className="add-contact">
              <input
                type="text"
                className="input-add-contact"
                value={newPhone}  value={maskPhone(newPhone)}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="(11) 99999-9999"
              />
              <Button
                severity="secondary"
                className="button-add-contact"
                onClick={handleAddPhone}
              >
                Confirmar telefone
              </Button>{" "}
              <Button
                severity="danger"
                outlined
                className="button-add-contact"
                onClick={() => setShowNewPhone(false)}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button severity="tertiary" onClick={() => setShowNewPhone(true)}>
              + Adicionar contato
            </Button>
          )}
        </div>

        {/* E-mails */}
        <div className="input-group">
          <label>E-MAIL</label>
          {allEmails.map((em, idx) => (
            <div key={idx} className="contact-line">
              <p>{em.email}</p>
              <div className="switch-line">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={em.is_active}
                    onChange={(ev) =>
                      handleToggleEmail(idx, ev.currentTarget.checked)
                    }
                  />
                  <span className="slider round"></span>
                </label>
                <small>
                  Este contato está {em.is_active ? "ativo" : "inativo"}
                </small>
              </div>
            </div>
          ))}

          {showNewEmail ? (
            <div className="add-contact">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="email@email.com"
              />
              <Button
                severity="secondary"
                className="button-add-contact"
                onClick={handleAddEmail}
              >
                Confirmar email
              </Button>
              <Button
                severity="danger"
                outlined
                className="button-add-contact"
                onClick={() => setShowNewEmail(false)}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button severity="tertiary" onClick={() => setShowNewEmail(true)}>
              + Adicionar contato
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
