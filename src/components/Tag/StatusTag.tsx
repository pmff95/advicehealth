import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface StatusTagProps {
  label: string;
  icon?: string | IconDefinition; // aceita string OU icone do pacote react-fontawesome
  severity?: "success" | "info" | "warning" | "danger" | "neutro";
  variant?: "background" | "icon";
  rounded?: boolean;
}

export default function StatusTag({
  label,
  icon,
  severity = "info",
  variant = "background",
  rounded = false,
}: StatusTagProps) {
  return (
    <Tag
      value={
        icon ? (
          <>
            {typeof icon === "string" ? (
              <i className={icon} style={{ marginRight: "0.25rem" }} />
            ) : (
              <FontAwesomeIcon icon={icon} style={{ marginRight: "0.25rem" }} />
            )}
            {label}
          </>
        ) : (
          label
        )
      }
      severity={severity}
      variant={variant}
      rounded={rounded}
    />
  );
}
