import React from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

