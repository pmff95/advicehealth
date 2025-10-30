import React from "react";
import "./Button.css";

type ButtonSeverity = "primary" | "secondary" | "tertiary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  severity?: ButtonSeverity;
  outlined?: boolean;
}

export default function Button({
  children,
  severity = "primary",
  outlined = false,
  className = "",
  type = "button",
  disabled = false, // 🟢 garante que o estado chegue no HTML
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled} // 🟢 garante bloqueio real no botão
      className={`btn btn-${severity} ${outlined ? "btn-outlined" : ""} ${
        disabled ? "btn-disabled" : ""
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
