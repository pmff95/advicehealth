import { useState, type ChangeEvent } from "react";
import Button from "../components/Button/Button";
import { fetchBeneficiaryId } from "../utils/api";
import { formatDateToISO } from "../utils/formatters";
import "./VerifyBeneficiary.css";

interface VerifyBeneficiaryProps {
  onBeneficiaryFound: (data: {
    cpf: string;
    guideNumber: string;
    birthDate: string;
    fullName: string;
    email?: string;
    phone?: string;
  }) => void;
  onBack: () => void;
}

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export default function VerifyBeneficiary({
  onBeneficiaryFound,
  onBack,
}: VerifyBeneficiaryProps) {
  const [, setCpf] = useState("");
  const [numeroGuia, setNumeroGuia] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "numeroGuia") {
      const digits = digitsOnly(value).slice(0, 11);
      setNumeroGuia(digits);
      setCpf(digits);
    } else if (name === "birthDate") {
      const digits = digitsOnly(value).slice(0, 8);
      let masked = digits;
      if (digits.length >= 3)
        masked = digits.slice(0, 2) + "/" + digits.slice(2);
      if (digits.length >= 5)
        masked =
          digits.slice(0, 2) + "/" + digits.slice(2, 4) + "/" + digits.slice(4);
      setBirthDate(masked);
    }
  };

  const handleSubmit = async () => {
    setError(null);

    if (!numeroGuia || !birthDate) {
      setError("Informe o número da guia e a data de nascimento.");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchBeneficiaryId("", {
        guide_number: numeroGuia,
        birth_date: formatDateToISO(birthDate),
      });

      if (!data || !data.name || !data.birth_date) {
        setError("Beneficiário não encontrado.");
        return;
      }

      onBeneficiaryFound({
        cpf: data.cpf ?? "",
        guideNumber: numeroGuia,
        birthDate: data.birth_date,
        fullName: data.name,
        email: data.email ?? "",
        phone: data.phone,
      });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro ao verificar beneficiário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className="verify-left">
        <div className="verify-page">
          <div className="portal-header">
            <h1>Portal do Beneficiário</h1>
          </div>
          <div className="verify-card">
            <h2>Verifique seus dados</h2>

            <label className="label-input" htmlFor="numeroGuia">
              Número da guia
            </label>
            <input
              id="numeroGuia"
              name="numeroGuia"
              className="verify-input"
              placeholder="12321324673"
              value={numeroGuia}
              onChange={handleChange}
            />

            <label className="label-input" htmlFor="birthDate">
              Data de nascimento
            </label>
            <input
              id="birthDate"
              name="birthDate"
              className="verify-input"
              placeholder="25/08/1990"
              value={birthDate}
              onChange={handleChange}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button
              onClick={handleSubmit}
              className="verify-submit"
              disabled={loading}
            >
              {loading ? "Verificando..." : "Verificar"}
            </Button>

            <Button
              onClick={onBack}
              severity="secondary"
              className="verify-back"
            >
              Voltar ao login
            </Button>
          </div>
        </div>
      </div>
      <div className="verify-right">
        <img src="/images/login-background.jpg" alt="Verificação" />
      </div>
    </div>
  );
}
