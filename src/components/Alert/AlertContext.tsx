import { createContext, useContext } from "react";
import type { AlertOptions } from "./types";

export interface AlertContextValue {
  showAlert: (message: string, options?: AlertOptions) => void;
  hideAlert: () => void;
}

export const AlertContext = createContext<AlertContextValue | undefined>(
  undefined
);

export function useAlert() {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("useAlert deve ser utilizado dentro de um AlertProvider");
  }

  return context;
}
