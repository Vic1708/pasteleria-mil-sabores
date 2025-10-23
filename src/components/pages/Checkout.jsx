import { useEffect, useState } from "react";
import DefaultLayout from "../templates/DefaultLayout";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    comuna: "",
    fechaEntrega: "",
    telefono: "",
  });
  const [boleta, setBoleta] = useState(null);
  const [estado, setEstado] = useState("En preparación 🧁");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nombre ||
      !form.direccion ||
      !form.comuna ||
      !form.fechaEntrega ||
      !form.telefono
    ) {
      alert("Por favor completa todos los campos antes de continuar.");
      return;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const fechaActual = new Date().toLocaleDateString("es-CL");

    const nuevaBoleta = {
      id: Date.now(), // ID único
      ...form,
      fechaCompra: fechaActual,
      productos: cart,
      subtotal,
      total: subtotal,
      estado: "En preparación 🧁",
    };

    // ✅ Guardar la boleta en localStorage para historial futuro
    const boletasPrevias = JSON.parse(localStorage.getItem("boletas")) || [];
    boletasPrevias.push(nuevaBoleta);
    localStorage.setItem("boletas", JSON.stringify(boletasPrevias));

    // ✅ Actualizar vista actual
    setBoleta(nuevaBoleta);
    setEstado("En preparación 🧁");

    // ✅ Vaciar carrito
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));

    // Cambiar estado a los 5s
    setTimeout(() => setEstado("Listo para retiro 🚚"), 5000);
  };
  // ✅ Mostrar boleta recién creada
  if (boleta) {
    return (
      <DefaultLayout>
        <div
          style={{
            padding: "40px",
            maxWidth: "600px",
            margin: "0 auto",
            background: "#fffaf4",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <Text
            style={{
              fontSize: "26px",
              color: "#8b4513",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            🧾 Boleta de compra
          </Text>

          <p><b>Cliente:</b> {boleta.nombre}</p>
          <p><b>Dirección:</b> {boleta.direccion}, {boleta.comuna}</p>
          <p><b>Teléfono:</b> {boleta.telefono}</p>
          <p><b>Fecha de entrega:</b> {boleta.fechaEntrega}</p>
          <p><b>Fecha de compra:</b> {boleta.fechaCompra}</p>

          <hr />
          <Text style={{ fontWeight: "bold", color: "#8b4513" }}>🧁 Productos:</Text>

          <ul>
            {boleta.productos.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} — $
                {(item.price * item.quantity).toLocaleString()}
              </li>
            ))}
          </ul>

          <hr />
          <p><b>Subtotal:</b> ${boleta.subtotal.toLocaleString()}</p>
          <p><b>Total:</b> ${boleta.total.toLocaleString()}</p>

          <div
            style={{
              backgroundColor: "#ffe0b2",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <Text style={{ fontSize: "18px", color: "#8b4513" }}>
              Estado del pedido: <b>{estado}</b>
            </Text>
          </div>

          <Button
            onClick={() => window.location.assign("/")}
            style={{
              marginTop: "20px",
              background: "#ffb6b9",
              padding: "10px 20px",
              borderRadius: "6px",
            }}
          >
            Volver al inicio
          </Button>
        </div>
      </DefaultLayout>
    );
  }
  // ✅ Si aún no hay boleta, mostrar formulario
  return (
    <DefaultLayout>
      <div style={{ padding: "30px" }}>
        <Text
          style={{ fontSize: "24px", fontWeight: "bold", color: "#8b4513" }}
        >
          🧁 Finalizar compra
        </Text>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío. Agrega productos antes de continuar.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxWidth: "400px",
            }}
          >
            <label>Nombre completo:</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required />

            <label>Dirección:</label>
            <input name="direccion" value={form.direccion} onChange={handleChange} required />

            <label>Comuna:</label>
            <input name="comuna" value={form.comuna} onChange={handleChange} required />

            <label>Fecha de entrega:</label>
            <input
              type="date"
              name="fechaEntrega"
              value={form.fechaEntrega}
              onChange={handleChange}
              required
            />

            <label>Teléfono de contacto:</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
            />

            <Button style={{ marginTop: "15px", background: "#ffb6b9" }}>
              Confirmar compra
            </Button>
          </form>
        )}
      </div>
    </DefaultLayout>
  );
}
