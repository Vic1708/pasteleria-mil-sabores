import { useState, useEffect } from "react";
import DefaultLayout from "../templates/DefaultLayout";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { useAuth } from "../../context/AuthContext";
import { calcularDescuentoCarrito } from "../../utils/discounts";


export default function Perfil() {
  const { user, logout } = useAuth();
  const [data, setData] = useState(user || {});
  const [mensaje, setMensaje] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [tieneBeneficioActivo, setTieneBeneficioActivo] = useState(false);

  useEffect(() => {
    if (user) {
      setData(user);
      const tieneActivo = verificarBeneficio(user);
      setTieneBeneficioActivo(tieneActivo);
    }
  }, [user]);

  const verificarBeneficio = (usuario) => {
    const correo = usuario.correo || "";
    const fechaNacimiento = usuario.fechaNacimiento || "";
    const codigo = usuario.codigoDescuento || "";

    // 📅 Calcular si HOY es cumpleaños
    const hoy = new Date();
    const cumpleDate = fechaNacimiento ? new Date(fechaNacimiento) : null;
    const esCumple =
      cumpleDate &&
      hoy.getDate() === cumpleDate.getDate() &&
      hoy.getMonth() === cumpleDate.getMonth();

    // 👵 Calcular edad
    let edad = 0;
    if (fechaNacimiento) {
      const f = new Date(fechaNacimiento);
      edad = hoy.getFullYear() - f.getFullYear();
      const m = hoy.getMonth() - f.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < f.getDate())) edad--;
    }

    let beneficioTexto = "";
    let tieneBeneficio = false;

    // 🎂 1. Cumpleaños + correo DUOC = torta de regalo
    if (esCumple && correo.includes("@duocuc.cl")) {
      tieneBeneficio = true;
      beneficioTexto = "🎂 ¡FELIZ CUMPLEAÑOS! 🎉\n\n" +
        "🎁 Tienes UNA TORTA COMPLETAMENTE GRATIS como regalo de cumpleaños.\n\n" +
        "✅ Beneficio activo porque:\n" +
        "   • Hoy es tu cumpleaños (" + new Date().toLocaleDateString() + ")\n" +
        "   • Tienes correo institucional DUOC UC\n\n" +
        "💝 Agrega cualquier torta al carrito y verás el descuento aplicado automáticamente en el checkout.";
    }
    // 👵 2. Mayor o igual a 50 años → 50% en todo
    else if (edad >= 50) {
      tieneBeneficio = true;
      beneficioTexto = `👵 DESCUENTO ADULTO MAYOR ACTIVO\n\n` +
        `🎁 Tienes 50% de descuento en TODOS los productos.\n\n` +
        `✅ Beneficio activo porque tienes ${edad} años (50+ años).\n\n` +
        `💰 El descuento se aplicará automáticamente en tu carrito.`;
    }
    // 🎟️ 3. Código FELICES50 → 10% en todo
    else if (codigo === "FELICES50") {
      tieneBeneficio = true;
      beneficioTexto = "🎟️ CÓDIGO PROMOCIONAL ACTIVO\n\n" +
        "🎁 Tienes 10% de descuento DE POR VIDA en todos los productos.\n\n" +
        "✅ Código 'FELICES50' activado correctamente.\n\n" +
        "💰 El descuento se aplicará automáticamente en tu carrito.";
    }
    // 🧾 Sin beneficios
    else {
      tieneBeneficio = false;
      // Caso especial: Es cumpleaños pero NO tiene correo DUOC
      if (esCumple && !correo.includes("@duocuc.cl")) {
        beneficioTexto = "🎂 ¡FELIZ CUMPLEAÑOS! 🎉\n\n" +
          "❌ Sin embargo, NO tienes el beneficio de torta gratis porque tu correo no es institucional DUOC UC.\n\n" +
          "💡 Para obtener una TORTA GRATIS en tu próximo cumpleaños:\n" +
          "   • Actualiza tu correo a uno institucional DUOC (@duocuc.cl)\n" +
          "   • El beneficio se activará automáticamente el día de tu cumpleaños";
      } else {
        beneficioTexto = "Sin beneficios activos actualmente.";
        
        // Sugerencias de cómo obtener beneficios
        const sugerencias = [];
        if (!correo.includes("@duocuc.cl")) {
          sugerencias.push("💡 Registra tu correo institucional DUOC (@duocuc.cl) para obtener una torta gratis en tu cumpleaños.");
        }
        if (edad < 50 && edad > 0) {
          sugerencias.push(`💡 Obtendrás 50% de descuento cuando cumplas 50 años (te faltan ${50 - edad} años).`);
        }
        if (codigo !== "FELICES50") {
          sugerencias.push("💡 Usa el código 'FELICES50' para obtener 10% de descuento de por vida.");
        }
        
        if (sugerencias.length > 0) {
          beneficioTexto += "\n\n" + sugerencias.join("\n");
        }
      }
    }

    setBeneficio(beneficioTexto);
    return tieneBeneficio;
  };


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Actualizar registro y sesión
    localStorage.setItem("usuario", JSON.stringify(data));
    localStorage.setItem("session_user", JSON.stringify(data));
    setMensaje("✅ Datos actualizados correctamente.");
    const tieneActivo = verificarBeneficio(data);
    setTieneBeneficioActivo(tieneActivo);
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
        <FormField
          label="Código de descuento (opcional)"
          name="codigoDescuento"
          value={data.codigoDescuento || ""}
          onChange={handleChange}
          placeholder="Ej: FELICES50"
        />

        <Button onClick={handleSave}>Guardar cambios</Button>
      </div>

      <div style={{ 
        marginTop: "30px", 
        padding: "25px",
        backgroundColor: tieneBeneficioActivo ? "#d4edda" : "#fff5e1",
        borderRadius: "15px",
        border: tieneBeneficioActivo ? "3px solid #28a745" : "2px solid #ff6b9d",
        maxWidth: "500px",
        margin: "30px auto",
        boxShadow: tieneBeneficioActivo ? "0 4px 15px rgba(40, 167, 69, 0.3)" : "0 2px 8px rgba(255, 107, 157, 0.2)"
      }}>
        <h2 style={{ 
          marginBottom: "15px",
          color: tieneBeneficioActivo ? "#155724" : "#8b4513",
          fontSize: "1.5rem"
        }}>
          {tieneBeneficioActivo ? "� ¡Beneficio Activo!" : "🎁 Tus Beneficios"}
        </h2>
        <Text style={{ 
          whiteSpace: "pre-line", 
          lineHeight: "1.8",
          fontSize: "15px",
          color: tieneBeneficioActivo ? "#155724" : "#5d4037"
        }}>
          {beneficio}
        </Text>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Button onClick={logout}>Cerrar sesión</Button>
      </div>
    </DefaultLayout>
  );
}
