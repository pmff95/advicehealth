import "./DetailsItem.css";
import Button from "./Button";
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import GuideHistory from "./GuideHistory";
import GuideItems from "./GuideItems";
import type { Guide } from "../types/guide";

interface DetailsItemProps {
  guide: Guide;
  onClose: () => void;
}

export default function DetailsItem({ guide, onClose }: DetailsItemProps) {
  const [showItens, setShowItens] = useState(false);

  return (
    <div className="details-view">
      <div className="guide-info">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="header-top">
            <Button variant="tertiary" className="close" onClick={onClose}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{ marginRight: "0.25rem" }}
              />{" "}
              Voltar
            </Button>
          </div>

          <Tag value={guide.type} severity="info" />
          <p className="guide-number">Guia {guide.number}</p>

          <span className="info-span">Operadora: {guide.date}</span>
          <span className="info-span">Data de atendimento: {guide.date}</span>
          <span
            className="info-span"
            style={{ fontWeight: "500", marginTop: "2.5rem" }}
          >
            {guide.doctor}
          </span>
          <span className="info-span">{guide.hospital}</span>
        </div>
        <div className="actions-container">
          <span>
            Documento oficial disponível para download com todas as informações
            detalhadas sobre a decisão da junta médica.
          </span>
          <button className="btn-download">
            <FontAwesomeIcon
              icon={faDownload}
              style={{ marginRight: "0.25rem" }}
            />
            Baixar documento
          </button>
          <button className="btn-download">
            <FontAwesomeIcon
              icon={faDownload}
              style={{ marginRight: "0.25rem" }}
            />
            Baixar notificação de Abertura
          </button>

          {/* Botão para abrir itens */}
          <a
            onClick={() => setShowItens((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {showItens ? "Ocultar itens da guia" : "Exibir itens da guia"}
          </a>
        </div>
      </div>

      {!showItens ? (
        <GuideHistory steps={guide.steps} />
      ) : (
        <GuideItems items={guide.itens} />
      )}
    </div>
  );
}
