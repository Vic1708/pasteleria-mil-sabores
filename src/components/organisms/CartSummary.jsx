// src/components/organisms/CartSummary.jsx
import { useState, useEffect } from "react";
import CartItem from "../molecules/CartItem";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { calcularDescuento } from "../../utils/discounts";

export default function CartSummary({ onCheckout }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalConDescuento = calcularDescuento(usuario, total, codigo);

  const increase = (id) =>
    setCart(cart.map((c) => (c.id === id ? { ...c, quantity: c.quantity + 1 } : c)));

  const decrease = (id) =>
    setCart(
      cart.map((c) =>
        c.id === id && c.quantity > 1 ? { ...c, quantity: c.quantity - 1 } : c
      )
    );

  const remove = (id) => setCart(cart.filter((c) => c.id !== id));

  return (
    <div className="container" style={{ maxWidth: "700px", margin: "auto" }}>
      {cart.length === 0 ? (
        <Text>Tu carrito está vacío 🛒</Text>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => increase(item.id)}
              onDecrease={() => decrease(item.id)}
              onRemove={() => remove(item.id)}
            />
          ))}

          <div style={{ marginTop: "20px" }}>
            <Text>¿Tienes un código de descuento?</Text>
            <input
              type="text"
              className="input"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ingresa tu código aquí"
            />
          </div>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <Text>Total original: ${total.toLocaleString()}</Text>
            <Text style={{ fontWeight: "bold" }}>
              Total con descuento: ${totalConDescuento.toLocaleString()}
            </Text>
            <Button onClick={onCheckout}>Finalizar compra</Button>
          </div>
        </>
      )}
    </div>
  );
}
