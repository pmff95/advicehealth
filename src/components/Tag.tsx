import type { ReactNode } from "react";
import "./Tag.css";

interface TagProps {
  value: ReactNode;
  severity?: "success" | "info" | "warning" | "danger" | "neutro";
  rounded?: boolean;
  variant?: "background" | "icon";
}

export default function Tag({
  value,
  severity = "info",
  rounded = false,
  variant = "background",
}: TagProps) {
  return (
    <span
      className={`tag tag-${severity} ${
        rounded ? "tag-rounded" : ""
      } tag-${variant}`}
    >
      {value}
    </span>
  );
}
