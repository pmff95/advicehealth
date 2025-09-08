import "./Tag.css";

interface TagProps {
  value: string;
  severity?: "success" | "info" | "warning" | "danger"; // opcional
  rounded?: boolean; // opcional para deixar estilo "pill"
}

export default function Tag({
  value,
  severity = "info",
  rounded = false,
}: TagProps) {
  return (
    <span className={`tag tag-${severity} ${rounded ? "tag-rounded" : ""}`}>
      {value}
    </span>
  );
}
