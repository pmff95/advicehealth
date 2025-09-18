import { useState } from "react";
import DetailsModal from "./DetailsModal";
import Tag from "./Tag";
import Button from "./Button";
import "./Guides.css";
import StatusTag from "./StatusTag";
import { STATUS, type Status } from "../enums/status";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Step {
  title: string;
  description: string;
  date: string;
  info: string;
  color: string;
}

interface Guide {
  id: number;
  type: string;
  number: string;
  date: string;
  doctor: string;
  hospital: string;
  status: Status;
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
    status: STATUS.CONCLUIDO,
    steps: [
      {
        date: "10/10/2010 às 18:00",
        title: "Finalizado",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Processo finalizado.",
        color: "#28a745",
      },
      {
        date: "",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Aguardando análise do profissional desempactador das últimas solicitações.",
        color: "#6c757d",
      },
      {
        date: "",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Sua solicitação foi encaminhada para junta médica.",
        color: "#0d6efd",
      },
      {
        date: "",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.",
        color: "#ffc107",
      },
      {
        date: "",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
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
    status: STATUS.CONCLUIDO,
    steps: [
      {
        date: "",
        title: "Finalizado",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Processo finalizado.",
        color: "#28a745",
      },
      {
        date: "",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Aguardando análise do profissional desempactador das últimas solicitações.",
        color: "#6c757d",
      },
      {
        date: "",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Sua solicitação foi encaminhada para junta médica.",
        color: "#0d6efd",
      },
      {
        date: "",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.",
        color: "#ffc107",
      },
      {
        date: "",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
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
    status: STATUS.CONCLUIDO,
    steps: [
      {
        date: "",
        title: "Finalizado",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Processo finalizado.",
        color: "#28a745",
      },
      {
        date: "",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Aguardando análise do profissional desempactador das últimas solicitações.",
        color: "#6c757d",
      },
      {
        date: "",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Sua solicitação foi encaminhada para junta médica.",
        color: "#0d6efd",
      },
      {
        date: "",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.",
        color: "#ffc107",
      },
      {
        date: "",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
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
    status: STATUS.CONCLUIDO,
    steps: [
      {
        date: "",
        title: "Finalizado",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Processo finalizado.",
        color: "#28a745",
      },
      {
        date: "",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Aguardando análise do profissional desempactador das últimas solicitações.",
        color: "#6c757d",
      },
      {
        date: "",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Sua solicitação foi encaminhada para junta médica.",
        color: "#0d6efd",
      },
      {
        date: "",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description:
          "Tentativa de consenso com os profissionais médicos sobre as últimas solicitações.",
        color: "#ffc107",
      },
      {
        date: "",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
        description: "Análise de pertinência dos itens solicitados.",
        color: "#6c757d",
      },
    ],
  },
];

export default function Guides() {
  const [selected, setSelected] = useState<Guide | null>(null);

  return (
    <main className="guides">
      {/* Novo header no estilo do protótipo */}
      <div className="guides-header-text">
        <h2>Olá, Maria</h2>
        <p>
          Acompanhe o status de autorização das guias médicas solicitadas para o
          seu plano de saúde.
        </p>
      </div>

      {/* lista de guias */}
      <div className="guides-list">
        {guides.map((g) => (
          <div key={g.id} className="guide">
            <div>
              <Tag value={g.type} severity="info" />
            </div>
            <h4>Guia {g.number}</h4>
            <span>Data de atendimento: {g.date}</span>
            <span style={{ marginTop: "1.5rem", fontWeight: "500" }}>
              {g.doctor}
            </span>
            <span>{g.hospital}</span>
            <div className="guide-actions">
              <StatusTag
                label="Concluído"
                icon={faCheck}
                severity="success"
                variant="icon"
              />
              <Button variant="secondary" onClick={() => setSelected(g)}>
                Ver detalhes
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <DetailsModal guide={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
