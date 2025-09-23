import "./TimeLine.css";
import Button from "./Button";
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

interface Step {
  title: string;
  info: string;
  date: string;
}

interface Guide {
  type: string;
  number: string;
  date: string;
  doctor: string;
  hospital: string;
  steps: Step[];
}

interface TimeLineProps {
  guide: Guide;
  onClose: () => void;
}

export default function TimeLine({ guide, onClose }: TimeLineProps) {
  const firstPendingIndex = guide.steps.findIndex((step) => !step.date?.trim());

  const getDotVariant = (index: number) => {
    if (firstPendingIndex === -1 || index < firstPendingIndex) {
      return "completed";
    }

    if (index === firstPendingIndex) {
      return "current";
    }

    return "upcoming";
  };

  const dotConfig = {
    completed: { src: "/images/dot1.png", size: 32 },
    current: { src: "/images/dot2.png", size: 24 },
    upcoming: { src: "/images/dot3.png", size: 24 },
  } as const;

  return (
    <div className="details-view">
      <div className="guide-info">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="header-top">
            <Button variant="tertiary" className="close" onClick={onClose}>
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
          <a>Exibir itens da guia</a>
        </div>
      </div>

      <div className="timeline">
        <h4 style={{ fontWeight: "500" }}>Histórico</h4>
        <div className="timeline-container">
          {guide.steps.map((s, index) => {
            const variant = getDotVariant(index);
            const isLast = index === guide.steps.length - 1;
            const { src, size } = dotConfig[variant];

            return (
              <div key={s.title} className="timeline-item">
                {/* Linha contínua */}
                {!isLast && <span className="timeline-connector" />}

                {/* Dot alinhado com o título */}
                <div className="timeline-marker">
                  <img
                    className="timeline-dot"
                    src={src}
                    alt=""
                    style={{ width: size, height: size }}
                  />
                </div>

                {/* Conteúdo */}
                <div className="timeline-content">
                  {s.date && <span className="timeline-date">{s.date}</span>}
                  <h4 className="timeline-title">{s.title}</h4>
                  <p className="timeline-info">{s.info}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
