import type { Status } from "../enums/status";

export interface GuideStep {
  title: string;
  date: string;
  info: string;
}

export type GuideItemStatus =
  | "FAVORAVEL AO PARECER DA OPERADORA"
  | "Parcialmente favorável"
  | "Desfavorável";

export interface GuideItem {
  codigo: string;
  descricao: string;
  status: GuideItemStatus;
  qtdSolicitada: number;
  qtdAutorizada: number;
  tipo: "PROCEDIMENTOS" | "MATERIAIS" | "MEDICAMENTOS";
}

export interface Guide {
  id: number;
  type: string;
  number: string;
  date: string;
  date_process: string;
  doctor: string;
  hospital: string;
  status: Status;
  steps: GuideStep[];
  items?: GuideItem[];
  itens?: GuideItem[];
}
