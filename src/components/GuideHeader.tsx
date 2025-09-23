import type { Guide } from "../types/guide";
import Tag from "./Tag/Tag";

interface GuideHeaderProps {
  guide: Guide;
}

export default function GuideHeader({ guide }: GuideHeaderProps) {
  return (
    <>
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
    </>
  );
}
