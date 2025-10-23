// src/utils/discounts.js

export function calcularDescuento(subtotal) {
  // Si no hay subtotal, devolvemos los valores básicos
  if (!subtotal || subtotal <= 0) {
    return { totalConDescuento: 0, beneficio: "" };
  }

  let beneficio = "";
  let totalConDescuento = subtotal;

  // Intentar obtener los datos del usuario registrado
  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};
  const correo = usuario.correo || "";
  const fechaNacimiento = usuario.fechaNacimiento || "";
  const codigo = usuario.codigoDescuento || "";

  // Calcular edad (si existe fecha de nacimiento)
  let edad = 0;
  if (fechaNacimiento) {
    const hoy = new Date();
    const cumple = new Date(fechaNacimiento);
    edad = hoy.getFullYear() - cumple.getFullYear();
    const m = hoy.getMonth() - cumple.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
      edad--;
    }
  }

  // 🎂 1. Regalo cumpleaños DUOC
  if (correo.includes("@duocuc.cl")) {
    beneficio = "🎂 Regalo de cumpleaños (correo institucional DUOC)";
    totalConDescuento = 0;
  }
  // 👵 2. 50% de descuento por edad
  else if (edad >= 50) {
    beneficio = "👵 Descuento 50% por edad (mayores de 50)";
    totalConDescuento = subtotal * 0.5;
  }
  // 🎟️ 3. Código FELICES50 = 10% de descuento
  else if (codigo === "FELICES50") {
    beneficio = "🎟️ Descuento 10% código FELICES50";
    totalConDescuento = subtotal * 0.9;
  }

  // ✅ Devolver objeto con ambas propiedades
  return { totalConDescuento, beneficio };
}
