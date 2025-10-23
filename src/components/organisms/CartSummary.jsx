import { useState, useEffect } from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import { calcularDescuentoCarrito } from "../../utils/discounts";

export default function CartSummary({ onCheckout }) {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalConDescuento, setTotalConDescuento] = useState(0);
  const [beneficio, setBeneficio] = useState("");
  const [cantidadTotal, setCantidadTotal] = useState(0);

  // 🔹 Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // 🔹 Recalcular totales y beneficios cada vez que el carrito cambie
  useEffect(() => {
    if (!cart || cart.length === 0) {
      setSubtotal(0);
      setTotalConDescuento(0);
      setCantidadTotal(0);
      setBeneficio("");
      return;
    }

    const cantidadTemp = cart.reduce(
      (acc, item) => acc + (item.quantity || 1),
      0
    );
    setCantidadTotal(cantidadTemp);

    const { subtotal, totalConDescuento, beneficio } =
      calcularDescuentoCarrito(cart);
    setSubtotal(subtotal);
    setTotalConDescuento(totalConDescuento);
    setBeneficio(beneficio);
  }, [cart]);

  // 🔹 Eliminar producto
  const eliminarProducto = (id) => {
    const nuevoCarrito = cart.filter((item) => item.id !== id);
    setCart(nuevoCarrito);
    localStorage.setItem("cart", JSON.stringify(nuevoCarrito));
  };

  // 🔹 Aumentar cantidad
  const aumentarCantidad = (id) => {
    const actualizado = cart.map((item) =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(actualizado);
    localStorage.setItem("cart", JSON.stringify(actualizado));
  };

  // 🔹 Disminuir cantidad
  const disminuirCantidad = (id) => {
    const actualizado = cart
      .map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => (item.quantity || 1) > 0);
    setCart(actualizado);
    localStorage.setItem("cart", JSON.stringify(actualizado));
  };

  // 🔹 Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Text style={{ fontSize: "20px", color: "#8b4513" }}>
          🛒 Tu carrito está vacío
        </Text>
      </div>
    );
  }

  // 🔹 Mostrar resumen del carrito
  return (
    <div style={{ padding: "20px" }}>
      <Text
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#8b4513",
        }}
      >
        🧁 Resumen de tu carrito
      </Text>

      {/* Productos del carrito */}
      <div style={{ marginTop: "20px" }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              background: "#fffaf4",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ flex: 2 }}>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text style={{ color: "#8b4513" }}>{item.category}</Text>
              <Text>${item.price.toLocaleString()}</Text>
            </div>

            <div style={{ flex: 1, textAlign: "center" }}>
              <Button onClick={() => disminuirCantidad(item.id)}>-</Button>
              <Text style={{ margin: "0 10px" }}>{item.quantity}</Text>
              <Button onClick={() => aumentarCantidad(item.id)}>+</Button>
            </div>

            <div style={{ flex: 1, textAlign: "right" }}>
              <Text>
                ${(item.price * item.quantity).toLocaleString()}
              </Text>
              <Button
                onClick={() => eliminarProducto(item.id)}
                style={{
                  background: "#d9534f",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Totales y beneficios */}
      <div style={{ textAlign: "right", marginTop: "30px" }}>
        <Text>🧾 Subtotal:</Text>

        {subtotal !== totalConDescuento && (
          <Text style={{ textDecoration: "line-through", color: "#999" }}>
            ${subtotal.toLocaleString()}
          </Text>
        )}

        {subtotal === totalConDescuento && (
          <Text>${subtotal.toLocaleString()}</Text>
        )}

        <Text>Total productos: {cantidadTotal}</Text>

        {beneficio && (
          <div
            style={{
              marginTop: "15px",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #f4c9a8",
              background: "#fff1e6",
              color: "#8b4513",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            {beneficio}
          </div>
        )}

        <Text
          style={{
            fontSize: "18px",
            color: "#8b4513",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          Total a pagar: ${totalConDescuento.toLocaleString()}
        </Text>

        <Button
          onClick={onCheckout}
          style={{
            marginTop: "15px",
            background: "#ffb6b9",
            borderRadius: "10px",
          }}
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}
