// src/components/pages/Carrito.jsx
import TwoColumnLayout from "../templates/TwoColumnLayout";
import CartSummary from "../organisms/CartSummary";
import { useState } from "react";
import Text from "../atoms/Text";

export default function Carrito() {
  const [cart, setCart] = useState([
    { id: 1, name: "Torta Frambuesa", price: 12900, image: "/imagenes/pastel.png", quantity: 1 },
  ]);

  const increase = (id) => setCart(cart.map(c => c.id === id ? { ...c, quantity: c.quantity + 1 } : c));
  const decrease = (id) => setCart(cart.map(c => c.id === id && c.quantity > 1 ? { ...c, quantity: c.quantity - 1 } : c));
  const remove = (id) => setCart(cart.filter(c => c.id !== id));

  return (
    <TwoColumnLayout
      left={<CartSummary cart={cart} onIncrease={increase} onDecrease={decrease} onRemove={remove} onCheckout={() => alert("Proceder a pago")} />}
      right={<Text>Resumen de compra y descuentos próximamente.</Text>}
    />
  );
}
