import { useState } from "react";
import DetailsModal from "../components/DetailsModal";
import Button from "../components/Button";
import "./Dashboard.css";
import Tag from "../components/Tag";

interface Step {
  title: string;
  description: string;
  color: string;
}

interface Guide {
  id: number;
  type: string;
  number: string;
  date: string;
  doctor: string;
  hospital: string;
  status: string;
  steps: Step[];
}

const guides: Guide[] = [
  {
    id: 1,
    type: "Internação",
    number: "123213246973",
    date: "28/09/2025",
    doctor: "Dr. Carlos Eduardo Silva",
    hospital: "Hospital Albert Einstein",
    status: "Concluído",
    steps: [
      {
        title: "Finalizado",
        description: "Processo finalizado.",
        color: "#28a745",
      },
      {
        title: "Aguardando profissional desempactador",
        description:
          "Aguardando análise do profissional desempactador das últimas solicitações.",
        color: "#6c757d",
      },
      {
        title: "Encaminhada para junta médica",
        description: "Sua solicitação foi encaminhada para junta médica.",
        color: "#0d6efd",
      },
      {
        title: "Tentativa de consenso",
        description:
          "Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.",
        color: "#ffc107",
      },
      {
        title: "Análise de pertinência dos itens solicitados",
        description: "Análise de pertinência dos itens solicitados.",
        color: "#6c757d",
      },
    ],
  },
  {
    id: 2,
    type: "SADT",
    number: "123213246973",
    date: "28/09/2025",
    doctor: "Dr. Carlos Eduardo Silva",
    hospital: "Hospital Albert Einstein",
    status: "Concluído",
    steps: [
      {
        title: "Finalizado",
        description: "Processo finalizado.",
        color: "#28a745",
      },
      {
        title: "Aguardando profissional desempactador",
        description:
          "Aguardando análise do profissional desempactador das últimas solicitações.",
        color: "#6c757d",
      },
      {
        title: "Encaminhada para junta médica",
        description: "Sua solicitação foi encaminhada para junta médica.",
        color: "#0d6efd",
      },
      {
        title: "Tentativa de consenso",
        description:
          "Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.",
        color: "#ffc107",
      },
      {
        title: "Análise de pertinência dos itens solicitados",
        description: "Análise de pertinência dos itens solicitados.",
        color: "#6c757d",
      },
    ],
  },
];

export default function Dashboard() {
  const [selected, setSelected] = useState<Guide | null>(null);

  return (
    <div className="guides">
      <h2>
        Acompanhe o status de autorização das guias médicas solicitadas para o
        seu titular.
      </h2>
      {guides.map((g) => (
        <div key={g.id} className="guide" onClick={() => setSelected(g)}>
          <div>
            <Tag value="Internação" severity="info" />
          </div>
          <h4>Guia {g.number}</h4>
          <span>Data de atendimento: {g.date}</span>
          <span>{g.doctor}</span>
          <span>{g.hospital}</span>
          <div className="guide-actions">
            <span className="status">{g.status}</span>
            <Button variant="tertiary">teste</Button>
          </div>
        </div>
      ))}
      {selected && (
        <DetailsModal guide={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
