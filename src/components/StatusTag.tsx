import Tag from "./Tag";
import { STATUS } from "../enums/status";
import type { Status } from "../enums/status";

const statusConfig: Record<Status, { label: string; icon: string; severity: "success" | "info" | "warning" }> = {
  [STATUS.CONCLUIDO]: {
    label: "Concluído",
    icon: "fa-solid fa-check",
    severity: "success",
  },
  [STATUS.FINALIZADO]: {
    label: "Finalizado",
    icon: "fa-solid fa-flag-checkered",
    severity: "info",
  },
  [STATUS.EM_ANDAMENTO]: {
    label: "Em andamento",
    icon: "fa-solid fa-spinner fa-spin",
    severity: "warning",
  },
};

interface StatusTagProps {
  status: Status;
}

export default function StatusTag({ status }: StatusTagProps) {
  const { label, icon, severity } = statusConfig[status];
  return (
    <Tag
      value={
        <>
          <i className={icon} style={{ marginRight: "0.25rem" }}></i>
          {label}
        </>
      }
      severity={severity}
      rounded
    />
  );
}
