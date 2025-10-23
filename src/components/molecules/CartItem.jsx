// src/components/molecules/CartItem.jsx
import Image from "../atoms/Image";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="card row" style={{ justifyContent: "space-between", alignItems: "center" }}>
      <Image src={item.image} alt={item.name} width="100px" />
      <div style={{ flex: 1, marginLeft: "10px" }}>
        <Text>{item.name}</Text>
        <Text size="small" muted>
          ${item.price} x {item.quantity}
        </Text>
      </div>
      <div className="row" style={{ gap: "6px" }}>
        <Button onClick={onDecrease}>-</Button>
        <Button onClick={onIncrease}>+</Button>
        <Button onClick={onRemove}>🗑</Button>
      </div>
    </div>
  );
}
