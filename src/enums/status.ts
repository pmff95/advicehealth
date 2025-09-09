export const STATUS = {
  CONCLUIDO: "CONCLUIDO",
  FINALIZADO: "FINALIZADO",
  EM_ANDAMENTO: "EM_ANDAMENTO",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
