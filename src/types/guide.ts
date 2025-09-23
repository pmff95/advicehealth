import type { Status } from "../enums/status";

export interface GuideStep {
  title: string;
  date: string;
  info: string;
}

export type GuideItemStatus =
  | "Aprovado"
  | "Parcialmente favorável"
  | "Desfavorável";

export interface GuideItem {
  codigo: string;
  descricao: string;
  status: GuideItemStatus;
  qtdSolicitada: number;
  qtdAutorizada: number;
}

export interface Guide {
  id: number;
  type: string;
  number: string;
  date: string;
  doctor: string;
  hospital: string;
  status: Status;
  steps: GuideStep[];
  itens?: GuideItem[];
}
