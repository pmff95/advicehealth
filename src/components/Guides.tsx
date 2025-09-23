import { useState } from "react";
import DetailsItem from "./DetailsItem";
import Tag from "./Tag";
import Button from "./Button";
import "./Guides.css";
import StatusTag from "./StatusTag";
import { STATUS, type Status } from "../enums/status";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Step {
  title: string;
  date: string;
  info: string;
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
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
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
        date: "10/10/2010 às 18:00",
        title: "Finalizado",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
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
        date: "10/10/2010 às 18:00",
        title: "Finalizado",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
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
        date: "10/10/2010 às 18:00",
        title: "Finalizado",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Aguardando profissional desempactador",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Encaminhada para junta médica",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Tentativa de consenso",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
      {
        date: "10/10/2010 às 18:00",
        title: "Análise de pertinência dos itens solicitados",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere velit leo, accumsan imperdiet metus eleifend at. Vivamus id convallis sapien",
      },
    ],
  },
];

export default function Guides() {
  const [selected, setSelected] = useState<Guide | null>(null);

  return (
    <main className="guides">
      {!selected ? (
        <>
          <div className="guides-header-text">
            <h2>Olá, Maria!</h2>
            <small>
              Acompanhe o status de autorização das guias médicas solicitadas
              para o seu plano de saúde.
            </small>
          </div>

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
        </>
      ) : (
        <DetailsItem guide={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
