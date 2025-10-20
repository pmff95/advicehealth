import { formatCPF, formatDate, formatPhone } from "../../utils/formatters";
import Button from "../Button/Button";
import "./BeneficiaryCard.css";
import { useEffect, useMemo, useState } from "react"; /* NOVO */
import { updateCurrentUser } from "../../utils/api";
import { getStoredToken } from "../../utils/auth";

interface BeneficiaryCardProps extends React.HTMLAttributes<HTMLElement> {
  cpf: string;
  name: string;
  birthDate: string;
  phone?: string;
  phones?: string[];
  email?: string;
  emails?: string[];
  isMobileMenuOpen?: boolean;
}

export default function BeneficiaryCard({
  name,
  birthDate,
  cpf,
  phone = "",
  phones = [],
  email = "",
  emails = [],
  className = "",
}: BeneficiaryCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name,
    birthDate,
    cpf,
    phone,
    phones,
    email,
    emails,
  });

  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showNewPhone, setShowNewPhone] = useState(false);
  const [showNewEmail, setShowNewEmail] = useState(false);

  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  /* NOVO: unificar + REMOVER duplicados e valores vazios na renderização */
  const allPhones = useMemo(
    () => [formData.phone, ...formData.phones].filter(Boolean),
    [formData.phone, formData.phones]
  );

  /* NOVO: deduplicar e-mails (o primeiro é o principal) */
  const allEmails = useMemo(() => {
    const arr = [formData.email, ...formData.emails].filter(Boolean);
    return Array.from(new Set(arr));
  }, [formData.email, formData.emails]);

  /* NOVO: estados de ativação controlados por índice */
  const [phonesActive, setPhonesActive] = useState<boolean[]>(
    allPhones.map(() => true)
  );
  const [emailsActive, setEmailsActive] = useState<boolean[]>(
    allEmails.map(() => true)
  );

  /* NOVO: sincronizar tamanhos quando adiciona/remove contatos */
  useEffect(() => {
    setPhonesActive((prev) => {
      const next = [...prev];
      while (next.length < allPhones.length) next.push(true);
      return next.slice(0, allPhones.length);
    });
  }, [allPhones]);

  useEffect(() => {
    setEmailsActive((prev) => {
      const next = [...prev];
      while (next.length < allEmails.length) next.push(true);
      return next.slice(0, allEmails.length);
    });
  }, [allEmails]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number
  ) => {
    const { value } = e.target;

    // 🔄 Atualiza o array unificado de telefones
    if (field === "phones" && typeof index === "number") {
      const updated = [...allPhones];
      updated[index] = value;

      // primeiro índice sempre é o principal (mantendo compatibilidade)
      setFormData((prev) => ({
        ...prev,
        phone: updated[0],
        phones: updated.slice(1),
      }));
      return;
    }

    if (field === "emails" && typeof index === "number") {
      /* ALTERADO: trabalhar sobre a lista deduplicada preservando principal */
      const updated = [...allEmails];
      updated[index] = value;

      const principal = updated[0] ?? "";
      const adicionais = Array.from(new Set(updated.slice(1).filter(Boolean)));

      setFormData((prev) => ({
        ...prev,
        email: principal,
        emails: adicionais,
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPhone = () => {
    if (newPhone.trim()) {
      // ✅ adiciona novo telefone ao final do array unificado
      const updatedPhones = [...allPhones, newPhone.trim()];
      setFormData((prev) => ({
        ...prev,
        phone: updatedPhones[0],
        phones: updatedPhones.slice(1),
      }));
      setPhonesActive((prev) => [...prev, true]); /* NOVO */
      setNewPhone("");
      setShowNewPhone(false);
    }
  };

  const handleAddEmail = () => {
    if (newEmail.trim()) {
      const candidate = newEmail.trim();
      // ✅ Evita duplicar (já deduplicado, mas protegemos aqui tbm)
      if (!allEmails.includes(candidate)) {
        const updated = [...allEmails, candidate];
        setFormData((prev) => ({
          ...prev,
          email: updated[0],
          emails: updated.slice(1),
        }));
        setEmailsActive((prev) => [...prev, true]); /* NOVO */
      }
      setNewEmail("");
      setShowNewEmail(false);
    }
  };

  /* NOVO: confirmação ao ativar/desativar */
  const handleTogglePhone = (idx: number, checked: boolean) => {
    const value = allPhones[idx];
    const ok = window.confirm(
      `${checked ? "Ativar" : "Inativar"} o telefone ${formatPhone(value)}?`
    );
    if (!ok) return; // não altera estado, checkbox volta pois é controlado
    setPhonesActive((prev) => {
      const next = [...prev];
      next[idx] = checked;
      return next;
    });
  };

  const handleToggleEmail = (idx: number, checked: boolean) => {
    const value = allEmails[idx];
    const ok = window.confirm(
      `${checked ? "Ativar" : "Inativar"} o e-mail ${value}?`
    );
    if (!ok) return;
    setEmailsActive((prev) => {
      const next = [...prev];
      next[idx] = checked;
      return next;
    });
  };

  const handleSave = async () => {
    try {
      setSaveError(null);
      setIsSaving(true);

      const token = getStoredToken();
      if (!token) throw new Error("Usuário não autenticado");

      const isoBirthDate = formatDate(formData.birthDate);

      /* NOVO: montar payload com is_active de cada item e e-mails sem duplicar */
      const payload = {
        name: formData.name,
        birth_date: isoBirthDate,
        email: allEmails[0] || "" /* NOVO: garante principal explícito */,
        additional_emails: allEmails
          .slice(1)
          .map((e, i) => ({
            email: e,
            is_active: emailsActive[i + 1] ?? true,
          })),
        phones: allPhones.map((p, i) => ({
          number: p,
          is_active: phonesActive[i] ?? true,
        })),
      };

      await updateCurrentUser(token, payload);
      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Falha desconhecida"
      );
    } finally {
      setIsSaving(false);
    }
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

        {/* ✅ Telefone unificado */}
        <div className="input-group">
          <label>TELEFONE/CELULAR</label>
          {allPhones.map((p, idx) =>
            isEditing ? (
              <input
                key={idx}
                type="text"
                value={p}
                onChange={(e) => handleChange(e, "phones", idx)}
                placeholder="(11) 99999-9999"
              />
            ) : (
              <div key={idx} className="phone-line">
                <p>{formatPhone(p)}</p>

                <div className="switch-line">
                  <label className="switch">
                    {/* ALTERADO: controlado + confirmação */}
                    <input
                      type="checkbox"
                      checked={phonesActive[idx] ?? true}
                      onChange={(ev) =>
                        handleTogglePhone(idx, ev.currentTarget.checked)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                  <small>
                    Este contato está {phonesActive[idx] ? "ativo" : "inativo"}
                  </small>
                </div>
              </div>
            )
          )}

          {!isEditing && (
            <>
              {showNewPhone ? (
                <div className="add-contact">
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                  <Button variant="secondary" onClick={handleAddPhone}>
                    Confirmar telefone
                  </Button>
                </div>
              ) : (
                <Button
                  variant="tertiary"
                  onClick={() => setShowNewPhone(true)}
                >
                  + Adicionar contato
                </Button>
              )}
            </>
          )}
        </div>

        {/* E-MAIL */}
        <div className="input-group">
          <label>E-MAIL</label>
          {allEmails.map((em, idx) =>
            isEditing ? (
              <input
                key={idx}
                type="email"
                value={em}
                onChange={(e) => handleChange(e, "emails", idx)}
                placeholder="email@email.com"
              />
            ) : (
              <div key={idx} className="contact-line">
                <p>{em}</p>
                <div className="switch-line">
                  <label className="switch">
                    {/* ALTERADO: controlado + confirmação */}
                    <input
                      type="checkbox"
                      checked={emailsActive[idx] ?? true}
                      onChange={(ev) =>
                        handleToggleEmail(idx, ev.currentTarget.checked)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                  <small>
                    Este contato está {emailsActive[idx] ? "ativo" : "inativo"}
                  </small>
                </div>
              </div>
            )
          )}

          {!isEditing && (
            <>
              {showNewEmail ? (
                <div className="add-contact">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="email@email.com"
                  />
                  <Button variant="secondary" onClick={handleAddEmail}>
                    Confirmar email
                  </Button>
                </div>
              ) : (
                <Button
                  variant="tertiary"
                  onClick={() => setShowNewEmail(true)}
                >
                  + Adicionar contato
                </Button>
              )}
            </>
          )}
        </div>

        {/* Botão final */}
        {isEditing ? (
          <Button variant="secondary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        ) : (
          <Button variant="secondary" onClick={() => setIsEditing(true)}>
            Atualizar dados do titular
          </Button>
        )}

        {saveError && (
          <p style={{ color: "red", marginTop: ".5rem" }}>{saveError}</p>
        )}
      </div>
    </aside>
  );
}
