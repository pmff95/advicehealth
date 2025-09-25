import type { HTMLAttributes } from "react";
import "./Header.css";

type HeaderProps = HTMLAttributes<HTMLElement> & {
  onLogout: () => void;
};

export default function Header({
  className = "",
  onLogout,
  ...rest
}: HeaderProps) {
  return (
    <header className={`dashboard-header ${className}`} {...rest}>
      <h2>Portal do Beneficiário</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button type="button" onClick={onLogout} className="logout-button">
          Sair
        </button>
      </div>
    </header>
  );
}
