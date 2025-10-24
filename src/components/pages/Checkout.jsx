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
  const [errors, setErrors] = useState({});
  const [boleta, setBoleta] = useState(null);
  const [estado, setEstado] = useState("En preparación 🧁");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const validarCampo = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "nombre":
        if (value.trim().length < 3) {
          errorMsg = "El nombre debe tener al menos 3 caracteres.";
        } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value)) {
          errorMsg = "El nombre solo puede contener letras.";
        }
        break;
      case "direccion":
        if (value.trim() === "") {
          errorMsg = "La dirección no puede estar vacía.";
        } else if (value.trim().length < 5) {
          errorMsg = "La dirección debe tener al menos 5 caracteres.";
        }
        break;
      case "comuna":
        if (value.trim() === "") {
          errorMsg = "La comuna no puede estar vacía.";
        } else if (value.trim().length < 3) {
          errorMsg = "La comuna debe tener al menos 3 caracteres.";
        }
        break;
      case "fechaEntrega":
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas
        const fechaSeleccionada = new Date(value);
        
        if (!value) {
          errorMsg = "Debes seleccionar una fecha de entrega.";
        } else if (fechaSeleccionada <= hoy) {
          errorMsg = "La fecha de entrega debe ser posterior a hoy.";
        }
        break;
      case "telefono":
        // Remover espacios para validar
        const telefonoLimpio = value.replace(/\s/g, "");
        
        if (value.trim() === "") {
          errorMsg = "El teléfono no puede estar vacío.";
        } else if (!telefonoLimpio.startsWith("+")) {
          errorMsg = "El teléfono debe comenzar con el símbolo '+'.";
        } else if (telefonoLimpio.length !== 12) {
          errorMsg = `El teléfono debe tener 12 caracteres (tiene ${telefonoLimpio.length}). Ejemplo: +56912345678`;
        } else if (!/^\+\d{11}$/.test(telefonoLimpio)) {
          errorMsg = "Formato inválido. Solo números después del '+'. Ejemplo: +56912345678";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validarCampo(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar todos los campos
    const nombreValido = validarCampo("nombre", form.nombre);
    const direccionValida = validarCampo("direccion", form.direccion);
    const comunaValida = validarCampo("comuna", form.comuna);
    const fechaValida = validarCampo("fechaEntrega", form.fechaEntrega);
    const telefonoValido = validarCampo("telefono", form.telefono);

    // Verificar si hay errores
    const hayErrores = !nombreValido || !direccionValida || !comunaValida || !fechaValida || !telefonoValido;
    const camposVacios = !form.nombre || !form.direccion || !form.comuna || !form.fechaEntrega || !form.telefono;

    if (hayErrores || camposVacios) {
      alert("Por favor, corrige los errores en el formulario antes de continuar.");
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "#fff5e6",
          padding: "20px",
        }}
      >
        {cart.length === 0 ? (
          <div
            style={{
              backgroundColor: "#fff5e6",
              padding: "40px 45px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(139, 69, 19, 0.1)",
              maxWidth: "440px",
              width: "100%",
              border: "1px solid rgba(139, 69, 19, 0.15)",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                fontSize: "24px",
                color: "#8b4513",
                fontFamily: "Pacifico",
                marginBottom: "20px",
              }}
            >
              🧁 Carrito Vacío
            </Text>
            <p style={{ marginBottom: "20px", color: "#5d4037" }}>
              Tu carrito está vacío. Agrega productos antes de continuar.
            </p>
            <Button onClick={() => window.location.assign("/catalogo")}>
              Ir al catálogo
            </Button>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "#fff5e6",
              padding: "40px 45px",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(139, 69, 19, 0.1)",
              maxWidth: "500px",
              width: "100%",
              border: "1px solid rgba(139, 69, 19, 0.15)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
                color: "#8b4513",
                fontFamily: "Pacifico",
                fontSize: "28px",
              }}
            >
              🧁 Finalizar compra
            </h2>

            <form
              onSubmit={handleSubmit}
              className="checkout-form"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div className="input-group">
                <label>Nombre completo:</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre completo"
                  className={errors.nombre ? "input-error" : ""}
                  required
                />
                {errors.nombre && (
                  <small className="error-text">{errors.nombre}</small>
                )}
              </div>

              <div className="input-group">
                <label>Dirección:</label>
                <input
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Calle y número"
                  className={errors.direccion ? "input-error" : ""}
                  required
                />
                {errors.direccion && (
                  <small className="error-text">{errors.direccion}</small>
                )}
              </div>

              <div className="input-group">
                <label>Comuna:</label>
                <input
                  name="comuna"
                  value={form.comuna}
                  onChange={handleChange}
                  placeholder="Tu comuna"
                  className={errors.comuna ? "input-error" : ""}
                  required
                />
                {errors.comuna && (
                  <small className="error-text">{errors.comuna}</small>
                )}
              </div>

              <div className="input-group">
                <label>Fecha de entrega:</label>
                <input
                  type="date"
                  name="fechaEntrega"
                  value={form.fechaEntrega}
                  onChange={handleChange}
                  className={errors.fechaEntrega ? "input-error" : ""}
                  required
                />
                {errors.fechaEntrega && (
                  <small className="error-text">{errors.fechaEntrega}</small>
                )}
              </div>

              <div className="input-group">
                <label>Teléfono de contacto:</label>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+56912345678"
                  className={errors.telefono ? "input-error" : ""}
                  required
                />
                {errors.telefono && (
                  <small className="error-text">{errors.telefono}</small>
                )}
                {!errors.telefono && (
                  <small style={{ color: "#8b4513", fontSize: "12px", marginTop: "4px", display: "block" }}>
                    Formato: +56912345678 (12 caracteres con +)
                  </small>
                )}
              </div>

              <Button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  marginTop: "10px",
                  background: "linear-gradient(135deg, #ffb6b9 0%, #ffa3a5 100%)",
                  color: "#8b4513",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(255, 182, 185, 0.4)",
                }}
              >
                Confirmar compra
              </Button>
            </form>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
