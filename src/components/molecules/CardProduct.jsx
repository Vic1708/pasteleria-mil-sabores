// src/components/molecules/CardProduct.jsx
import Image from "../atoms/Image";
import Title from "../atoms/Title";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

export default function CardProduct({ image, name, price, category, onAdd }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <Image src={image} alt={name} height="180px" />
      <div style={{ marginTop: "10px" }}>
        <Badge>{category}</Badge>
        <Title level={3} style={{ marginTop: "8px" }}>
          {name}
        </Title>
        <Text style={{ fontWeight: "bold" }}>${price}</Text>
        <Button onClick={onAdd}>Agregar</Button>
      </div>
    </div>
  );
}

