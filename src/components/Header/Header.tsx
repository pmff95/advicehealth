import "./Header.css";

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export default function Header({ className = "", ...rest }: HeaderProps) {
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
        <a href="/">Sair</a>
      </div>
    </header>
  );
}
