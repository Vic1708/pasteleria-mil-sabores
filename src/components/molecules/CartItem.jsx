import Button from "../atoms/Button";
import Text from "../atoms/Text";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <div>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <Text>{item.category}</Text>
        {item.mensaje && (
          <Text style={{ fontStyle: "italic", color: "#8b4513" }}>
            💬 “{item.mensaje}”
          </Text>
        )}
        <Text>${item.price.toLocaleString()} c/u</Text>
      </div>

      <div className="row" style={{ gap: "6px", alignItems: "center" }}>
        <Button onClick={onDecrease}>−</Button>
        <Text>{item.quantity}</Text>
        <Button onClick={onIncrease}>+</Button>
        <Button onClick={onRemove}>🗑️</Button>
      </div>
    </div>
  );
}
