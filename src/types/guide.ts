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
  /**
   * Alguns payloads utilizam o atributo "items" enquanto outros
   * mantêm a grafia original "itens". Mantemos ambos para garantir
   * compatibilidade com as diferentes estruturas de dados.
   */
  items?: GuideItem[];
  itens?: GuideItem[];
}
