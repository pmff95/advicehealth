export type AlertType = "success" | "error" | "attention" | "info";

export interface AlertOptions {
  type?: AlertType;
  title?: string;
  duration?: number | null;
}

export interface AlertState {
  message: string;
  type: AlertType;
  title?: string;
}
