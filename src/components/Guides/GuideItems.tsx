import type { GuideItem } from "../../types/guide";

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

  return (
    <div className="itens-guia">
      <h4 style={{ fontWeight: "500" }}>Itens da guia</h4>
      <div className="itens-container">
        {items.map((item) => {
          const statusClass =
            item.status === "Aprovado"
              ? "status-aprovado"
              : item.status === "Parcialmente favorável"
              ? "status-parcial"
              : "status-reprovado";

          return (
            <div key={item.codigo} className="item-card">
              <strong>
                {item.codigo} - {item.descricao}
              </strong>
              <p>
                Qtd. solicitada: {item.qtdSolicitada} | Qtd. autorizada:{" "}
                {item.qtdAutorizada}
              </p>
              <span className={`status ${statusClass}`}>{item.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuideItems;
