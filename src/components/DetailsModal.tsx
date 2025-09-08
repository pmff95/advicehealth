import "./DetailsModal.css"
import Button from "./Button"

interface Step {
  title: string
  description: string
  color: string
}

interface Guide {
  type: string
  number: string
  date: string
  doctor: string
  hospital: string
  steps: Step[]
}

interface DetailsModalProps {
  guide: Guide
  onClose: () => void
}

export default function DetailsModal({ guide, onClose }: DetailsModalProps) {
  return (
    <div className="details-overlay" onClick={onClose}>
      <div className="details-panel" onClick={(e) => e.stopPropagation()}>
          <Button variant="tertiary" className="close" onClick={onClose}>
            Fechar
          </Button>
        <h2>{guide.type}</h2>
        <p className="guide-number">Guia {guide.number}</p>
        <p>{guide.doctor}<br />{guide.hospital}</p>
        <div className="timeline">
          {guide.steps.map((s) => (
            <div key={s.title} className="timeline-item">
              <span className="dot" style={{ background: s.color }} />
              <div>
                <strong>{s.title}</strong>
                <p>{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

