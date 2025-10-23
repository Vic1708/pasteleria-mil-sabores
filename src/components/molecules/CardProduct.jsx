// src/components/molecules/CardProduct.jsx
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import { addToCart } from "../../utils/cart";

export default function CardProduct({ id, image, name, price, category, onPersonalize }) {
  const esTorta =
    category?.toLowerCase().includes("torta") || category?.toLowerCase().includes("pastel");

  const handleAdd = () => {
    const product = { id, image, name, price, category };
    addToCart(product);
  };

  return (
    <div
      className="card"
      style={{
        padding: "12px",
        textAlign: "center",
        background: "#fffaf4",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Image src={image} alt={name} style={{ borderRadius: "10px", width: "100%" }} />
      <Text style={{ fontWeight: "bold", fontSize: "18px", marginTop: "8px" }}>{name}</Text>
      <Text style={{ color: "#8b4513" }}>{category}</Text>
      <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
        ${price.toLocaleString()}
      </Text>

      {esTorta ? (
        <Button onClick={onPersonalize}>Agregar con mensaje</Button>
      ) : (
        <Button onClick={handleAdd}>Agregar al carrito</Button>
      )}
    </div>
  );
}
