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
            <Button severity="tertiary" className="close" onClick={onClose}>
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
          <button
            className="btn-download"
            onClick={() =>
              window.open(
                "https://advicehealth.s3.us-east-1.amazonaws.com/Log%20Name.pdf?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIC8i4QBpYZA23OjBO8sXXcuVsV6ZVPY53PN56UYmJBtbAiBsT97icAV4FU2J%2BWyMn5o6leZeHYeES3x3fChSo9dPzirMAwhGEAEaDDIwNzIwMTEzNjM5MyIMvneQ9ExhQP47HmlcKqkDU02linZY7MUbbQivYNoPmBuYBkfL757Kga4GB0%2F6523Tt3B21QyUABQ5QJ2SxKjtlKn2on0Mpr6R%2FvSJCsKoD1DjddXJbujf%2FF%2Fjcxal1P9VR7ndj%2BmKSo2clDIU7PAktmzZVaceY8AbLLj1lDvDIo7xtr%2Bntf9BJR9Nkgshm7v6i2TdCBDBMh2lzWZVzm1ig3aQJ0CTvdGEZurpqWUqPN43WP8KpwRscTjZ4bIMhHdtYfhBFZc4h6Z4uQ9GY3oZb6dDcMrCB5FbCbo1kr1OFlxpyC3hyALTcHcaGQ6cZf3jaQrbjcUQf9NFjrN0IdEApfAPMzrjEfsfh%2B6rnOYIo4NmoTobdtaBu2FJHJXXc7ZtSz0o%2B7S5YOTNrsl5TVAWCb0ba4cumr5pPf%2BXd5zh7FeZSO6nyymbtCNmDoub6FqgFSdkVrXSsmBgGwGa4V2AaO8vtQjaNgCT7231JI8oRB%2BgGvO1BXPTbZlNZt0sEjtn1csu%2FVoax3Tq8ygsWqOvCRXsR3rSCJWZHEU7hFp8vIqBofF0StGkIyn9mEx2Zg0%2FIYdLDQx%2FY7QwxM%2FoxwY63wKTOW80v%2BHg0SuVyQArWXmGtCUZLwKgV9UE8K9nq3TPgJnHHABLyHlJEisVVa22Qug6FN2SIWHkmX1Ma3ciOKz2lpljC%2B98er%2FMcsKqbgkMTB%2BQXfc94SzZXax0O%2FqkKzNj%2FIdQVZQI8%2F3ukN7vfuUhSzWAzoxfCFJBIxfiJLSZcn1XOaAJeF2zsMJarTbdqGxQ4xghj%2Fxm1ERYGWQIFkGTsAs1GAPPcw6jYYazrbMbUW8oO%2FKmZ81zmZsOnTj4Ce7W1nosh2iN8EwiRqBdfviM36b5TBjAawtSzodAZ0BqdAjBah2%2BoiFLt8bbMFIXnooZLJBeXa6fAuB8qzI9Gay%2F4AKVZEqCoVSOMUAxQVYZOVjIYaVlzGphr8Hm56X5xU8CAUfnfOAyGLDHBg19JsG7Cd1stJnwi5sKPZ0viTeqYJFiv2II1Xs9%2B9abY03ph5P0J%2BkPxMU58AkEf0lTcOw%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATAPRGN4ETHL25ZPU%2F20251023%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251023T130424Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=2a635ebf76653b4b765d1a116a5f3dd239b950c6c5ebbec895c7a0369ccfa9e0",
                "_blank"
              )
            }
          >
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
          <a onClick={handleToggleItems} style={{ cursor: "pointer" }}>
            {showItens ? "Ocultar itens da guia" : "Exibir itens da guia"}
          </a>
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
