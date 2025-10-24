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
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn-${severity} ${
        outlined ? "btn-outlined" : ""
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
