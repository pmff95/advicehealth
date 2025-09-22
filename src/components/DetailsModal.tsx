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
        {guide.steps.map((s) => (
          <div key={s.title} className="timeline-item">
            <span className="dot" />
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>{s.title}</h4>
                {s.date && <Tag severity="neutro" value={s.date} />}
              </div>
              <div className="info-timeline">
                <span className="info-span">{s.description}</span>
                <span className="info-span card-info">{s.info}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
