import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Guides.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import type { Guide } from "../../types/guide";
import Tag from "../Tag/Tag";
import StatusTag from "../Tag/StatusTag";
import DetailsItem from "../DetailsItem/DetailsItem";
import {
  fetchGuidesByBeneficiary,
  fetchGuideDetail,
  fetchCurrentUser,
  fetchBeneficiaryId,
} from "../../utils/api";
import { getStoredToken } from "../../utils/auth";
import type { UserProfile } from "../../types/user";
import { formatDateToISO } from "../../utils/formatters";

export default function Guides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selected, setSelected] = useState<Guide | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingBeneficiary, setLoadingBeneficiary] = useState(false);
  const [loadingGuides, setLoadingGuides] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [beneficiaryId, setBeneficiaryId] = useState<number | null>(null);

  const token = getStoredToken();

  useEffect(() => {
    async function loadUser() {
      if (!token) return;

      try {
        setLoadingUser(true);
        const user = await fetchCurrentUser(token);
        setCurrentUser(user);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoadingUser(false);
      }
    }

    loadUser();
  }, [token]);

  useEffect(() => {
    async function loadBeneficiaryId() {
      if (!token || !currentUser) return;
      setError(null);

      try {
        setLoadingBeneficiary(true);

        //if (!currentUser.guideNumber || !currentUser.birthDate) {
        if (!currentUser.birthDate) {
          setError("Dados do usuário incompletos para buscar o beneficiário.");
          return;
        }

        const data = await fetchBeneficiaryId(token, {
          guide_number: "",
          birth_date: formatDateToISO(currentUser.birthDate),
        });

        setBeneficiaryId(data.id);
      } catch (err: unknown) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Informação do Beneficiário não encontrada."
        );
      } finally {
        setLoadingBeneficiary(false);
      }
    }

    loadBeneficiaryId();
  }, [token, currentUser]);

  useEffect(() => {
    async function loadGuides() {
      if (beneficiaryId === null || !token) return;

      try {
        setLoadingGuides(true);
        const data = await fetchGuidesByBeneficiary(token, beneficiaryId);
        setGuides(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao buscar as guias.");
      } finally {
        setLoadingGuides(false);
      }
    }

    loadGuides();
  }, [token, beneficiaryId]);

  const handleSelect = async (numeroGuia: string) => {
    if (!token) {
      setError("Token de autenticação não encontrado.");
      return;
    }

    try {
      setLoadingGuides(true);
      const detail = await fetchGuideDetail(token, numeroGuia);
      setSelected(detail);
      setError(null);
    } catch (err: unknown) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Erro ao buscar detalhes da guia."
      );
    } finally {
      setLoadingGuides(false);
    }
  };

  return (
    <main className="guides">
      {(loadingUser || loadingBeneficiary || loadingGuides) && (
        <p>Carregando...</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!selected ? (
        <>
          <div className="guides-header-text">
            <h2>Olá, {currentUser?.name ?? "Usuário"}!</h2>
            <small>
              Acompanhe o status de autorização das guias médicas solicitadas
              para o seu plano de saúde.
            </small>
          </div>

          <div className="guides-list">
            {guides.map((g) => (
              <div key={g.id} className="guide">
                <div>
                  <Tag value={g.type} severity="info" />
                </div>
                <h4>Guia {g.number}</h4>
                <span>
                  Data de atendimento: {new Date(g.date).toLocaleDateString()}
                </span>
                <span
                  style={{
                    marginTop: "2rem",
                    paddingTop: ".7rem",
                    borderTop: "1px solid #9CC4EC",
                    fontWeight: "500",
                  }}
                >
                  {g.doctor}
                </span>
                <span>{g.hospital}</span>
                <div className="guide-actions">
                  <StatusTag
                    label={g.date_process ? "Concluído" : "Em andamento"}
                    icon={faCheck}
                    severity="success"
                    variant="icon"
                  />
                  <Button
                    severity="secondary"
                    onClick={() => handleSelect(g.number)}
                  >
                    Ver detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <DetailsItem guide={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
