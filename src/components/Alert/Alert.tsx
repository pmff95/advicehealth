import "./Alert.css";
import type { AlertType } from "./types";

const TYPE_LABELS: Record<AlertType, string> = {
  success: "Sucesso",
  error: "Erro",
  attention: "Atenção",
  info: "Informação",
};

const TYPE_ICONS: Record<AlertType, string> = {
  success: "✔",
  error: "✖",
  attention: "⚠",
  info: "ℹ",
};

interface AlertProps {
  message: string;
  type: AlertType;
  title?: string;
  onClose?: () => void;
}

export default function Alert({ message, type, title, onClose }: AlertProps) {
  const icon = TYPE_ICONS[type];
  const heading = title ?? TYPE_LABELS[type];

  return (
    <div className={`alert alert--${type}`} role="alert" aria-live="assertive">
      <span className="alert__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="alert__content">
        {heading ? <strong className="alert__title">{heading}</strong> : null}
        <p className="alert__message">{message}</p>
      </div>
      {onClose ? (
        <button
          type="button"
          className="alert__close"
          onClick={onClose}
          aria-label="Fechar alerta"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
