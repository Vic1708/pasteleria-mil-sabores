import { useState, useEffect } from "react";
import DefaultLayout from "../templates/DefaultLayout";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { useAuth } from "../../context/AuthContext";
import { calcularDescuento } from "../../utils/discounts";

export default function Perfil() {
  const { user, logout } = useAuth();
  const [data, setData] = useState(user || {});
  const [mensaje, setMensaje] = useState("");
  const [beneficio, setBeneficio] = useState("");

  useEffect(() => {
    if (user) {
      setData(user);
      verificarBeneficio(user);
    }
  }, [user]);

  const verificarBeneficio = (usuario) => {
    const total = 10000; // valor base para simular beneficio
    const totalConDescuento = calcularDescuento(usuario, total, "");
    let msg = "";

    if (totalConDescuento === 0)
      msg = "🎂 ¡Tienes una torta gratis por tu cumpleaños con correo Duoc!";
    else if (totalConDescuento === total * 0.5)
      msg = "👵 Descuento del 50% por ser mayor de 50 años.";
    else if (totalConDescuento === total * 0.9)
      msg = "🎟️ Descuento del 10% por código FELICES50.";
    else msg = "Sin beneficios activos.";

    setBeneficio(msg);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Actualizar registro y sesión
    localStorage.setItem("usuario", JSON.stringify(data));
    localStorage.setItem("session_user", JSON.stringify(data));
    setMensaje("✅ Datos actualizados correctamente.");
    verificarBeneficio(data);
  };

  if (!user) {
    return (
      <DefaultLayout>
        <Text>No hay usuario logueado. Por favor inicia sesión.</Text>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <h1>Perfil del Usuario 👩‍🍳</h1>

      {mensaje && <Text style={{ color: "green" }}>{mensaje}</Text>}
      <div className="card" style={{ maxWidth: "500px", margin: "auto" }}>
        <FormField
          label="Nombre completo"
          name="nombre"
          value={data.nombre || ""}
          onChange={handleChange}
        />
        <FormField
          type="email"
          label="Correo electrónico"
          name="correo"
          value={data.correo || ""}
          onChange={handleChange}
        />
        <FormField
          type="date"
          label="Fecha de nacimiento"
          name="fechaNacimiento"
          value={data.fechaNacimiento || ""}
          onChange={handleChange}
        />
        <FormField
          label="Dirección"
          name="direccion"
          value={data.direccion || ""}
          onChange={handleChange}
        />

        <Button onClick={handleSave}>Guardar cambios</Button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>🎁 Beneficio actual:</h2>
        <Text>{beneficio}</Text>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Button onClick={logout}>Cerrar sesión</Button>
      </div>
    </DefaultLayout>
  );
}
