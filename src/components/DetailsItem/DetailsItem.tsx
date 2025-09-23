import "./DetailsItem.css";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import GuideHistory from "../Guides/GuideHistory";
import GuideItems from "../Guides/GuideItems";
import type { Guide } from "../../types/guide";
import GuideHeader from "../GuideHeader";

interface DetailsItemProps {
  guide: Guide;
  onClose: () => void;
}

export default function DetailsItem({ guide, onClose }: DetailsItemProps) {
  const [showItens, setShowItens] = useState(false);
  const guideItems = guide.itens ?? guide.items ?? [];
  const hasItems = guideItems.length > 0;

  const handleToggleItems = () => {
    if (!hasItems) {
      return;
    }

    setShowItens((prev) => !prev);
  };

  useEffect(() => {
    setShowItens(false);
  }, [guide.id]);

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

          <GuideHeader guide={guide} />
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
          {hasItems ? (
            <a onClick={handleToggleItems} style={{ cursor: "pointer" }}>
              {showItens
                ? "Ocultar itens da guia"
                : "Exibir itens da guia"}
            </a>
          ) : (
            <span className="no-items-available">
              Itens da guia indisponíveis no momento.
            </span>
          )}
        </div>
      </div>

      {!showItens ? (
        <GuideHistory steps={guide.steps} />
      ) : (
        <GuideItems items={guideItems} />
      )}
    </div>
  );
}
