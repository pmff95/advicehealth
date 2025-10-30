import { createContext, useState } from "react";
import Alert from "./Alert";
import type { AlertType } from "./types";

interface AlertContextType {
  showAlert: (
    message: string,
    type?: AlertType,
    title?: string,
    duration?: number
  ) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<
    { id: number; message: string; type: AlertType; title?: string }[]
  >([]);

  const showAlert = (
    message: string,
    type: AlertType = "info",
    title?: string,
    duration: number = 3000
  ) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, duration);
  };

  const handleClose = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="alert-container">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            title={alert.title}
            onClose={() => handleClose(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}
