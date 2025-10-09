import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { GuideItem } from "../../types/guide";
import StatusTag from "../Tag/StatusTag";

interface GuideItemsProps {
  items?: GuideItem[];
}

const GuideItems = ({ items = [] }: GuideItemsProps) => {
  if (items.length === 0) {
    return (
      <div className="itens-guia">
        <h4 style={{ fontWeight: "500" }}>Itens da guia</h4>
        <p className="no-guide-items">
          Nenhum item disponível para esta guia no momento.
        </p>
      </div>
    );
  }

  // 🔹 Agrupando itens por tipo
  const groupedItems = items.reduce<Record<string, GuideItem[]>>(
    (acc, item) => {
      const tipo = item.tipo || "OUTROS"; // novo campo tipo
      if (!acc[tipo]) {
        acc[tipo] = [];
      }
      acc[tipo].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="itens-guia">
      <h4 style={{ fontWeight: "500" }}>Itens da guia</h4>
      <div className="itens-container">
        {Object.entries(groupedItems).map(([tipo, itens]) => (
          <div key={tipo} className="item-group">
            <h5
              style={{
                marginTop: "1rem",
                marginBottom: "0.5rem",
                color: "#004085",
              }}
            >
              {tipo}
            </h5>
            {itens.map((item) => {
              const statusClass =
                item.status === "FAVORAVEL AO PARECER DA OPERADORA"
                  ? "success"
                  : item.status === "Parcialmente favorável"
                  ? "warning"
                  : "danger";
              const iconStatus =
                item.status === "FAVORAVEL AO PARECER DA OPERADORA"
                  ? faCircleCheck
                  : item.status === "Parcialmente favorável"
                  ? faCircleExclamation
                  : faCircleXmark;

              return (
                <div key={item.codigo} className="item-card">
                  <strong>
                    {item.codigo} - {item.descricao}
                  </strong>
                  <div style={{ display: "flex", gap: "10%" }}>
                    <small>Qtd. solicitada: {item.qtdSolicitada}</small>
                    <small>Qtd. autorizada: {item.qtdAutorizada} </small>
                  </div>
                  <StatusTag
                    label={item.status}
                    icon={iconStatus}
                    severity={statusClass}
                    variant="icon"
                  />
                  {/* <span className={`status ${statusClass}`}>{item.status}</span> */}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideItems;
