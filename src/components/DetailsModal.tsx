import "./DetailsModal.css";
import Button from "./Button";
import Tag from "./Tag";

interface Step {
  title: string;
  description: string;
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

interface DetailsModalProps {
  guide: Guide;
  onClose: () => void;
}

export default function DetailsModal({ guide, onClose }: DetailsModalProps) {
  const firstPendingIndex = guide.steps.findIndex(
    (step) => !step.date?.trim(),
  );

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
      <div className="header-top">
        <Button variant="tertiary" className="close" onClick={onClose}>
          Voltar
        </Button>
      </div>

      <Tag value={guide.type} severity="info" />
      <p className="guide-number">Guia {guide.number}</p>

      <div className="guide-info">
        <span className="info-span">
          <strong>Data de atendimento:</strong> {guide.date}
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong className="info-span">{guide.doctor}</strong>
          <span className="info-span">{guide.hospital}</span>
        </div>
      </div>

      <div className="timeline">
        <h4 style={{ fontWeight: "500" }}>Histórico</h4>
        {guide.steps.map((s, index) => {
          const variant = getDotVariant(index);
          const isLast = index === guide.steps.length - 1;
          const { src, size } = dotConfig[variant];

          return (
            <div key={s.title} className="timeline-item">
              <div className="timeline-marker">
                <img
                  className="timeline-dot"
                  src={src}
                  alt=""
                  style={{ width: size, height: size }}
                />
                {!isLast && <span className="timeline-connector" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-content-header">
                  <h4>{s.title}</h4>
                  {s.date && <Tag severity="neutro" value={s.date} />}
                </div>
                <div className="info-timeline">
                  <span className="info-span">{s.description}</span>
                  <span className="info-span card-info">{s.info}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
