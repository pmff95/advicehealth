import { useState } from "react";
import Button from "../Button/Button";
import "./Guides.css";
import { STATUS } from "../../enums/status";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import type { Guide, GuideItem } from "../../types/guide";
import Tag from "../Tag/Tag";
import StatusTag from "../Tag/StatusTag";
import DetailsItem from "../DetailsItem/DetailsItem";

const mockGuideItems: GuideItem[] = [
  {
    codigo: "03.03.01.001-2",
    descricao: "Consulta médica com cirurgião geral",
    status: "Aprovado",
    qtdSolicitada: 1,
    qtdAutorizada: 1,
    tipo: "PROCEDIMENTOS",
  },
  {
    codigo: "04.06.02.013-4",
    descricao: "Tomografia computadorizada de tórax",
    status: "Parcialmente favorável",
    qtdSolicitada: 2,
    qtdAutorizada: 1,
    tipo: "MATERIAIS",
  },
  {
    codigo: "02.09.01.003-1",
    descricao: "Sessão de fisioterapia motora",
    status: "Parcialmente favorável",
    qtdSolicitada: 10,
    qtdAutorizada: 6,
    tipo: "PROCEDIMENTOS",
  },
  {
    codigo: "02.01.01.015-0",
    descricao: "Diária de enfermagem em apartamento",
    status: "Aprovado",
    qtdSolicitada: 3,
    qtdAutorizada: 3,
    tipo: "MEDICAMENTOS",
  },
  {
    codigo: "03.16.04.002-7",
    descricao: "Materiais cirúrgicos descartáveis",
    status: "Desfavorável",
    qtdSolicitada: 5,
    qtdAutorizada: 0,
    tipo: "PROCEDIMENTOS",
  },
  {
    codigo: "04.03.01.001-9",
    descricao: "Ressonância magnética de coluna lombar",
    status: "Aprovado",
    qtdSolicitada: 1,
    qtdAutorizada: 1,
    tipo: "PROCEDIMENTOS",
  },
];

const guides: Guide[] = [
  {
    id: 1,
    type: "Internação",
    number: "123213246973",
    date: "28/09/2025",
    doctor: "Dr. Carlos Eduardo Silva",
    hospital: "Hospital Albert Einstein",
    status: STATUS.CONCLUIDO,
    itens: mockGuideItems,
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
    itens: mockGuideItems,
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
    itens: mockGuideItems,
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
    itens: mockGuideItems,
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
