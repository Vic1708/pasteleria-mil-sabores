// src/utils/discounts.js
export function calcularDescuento(subtotal, usuario = null) {
  if (!subtotal || subtotal <= 0) {
    return { totalConDescuento: 0, beneficio: "Sin beneficios activos." };
  }

  let beneficio = "";
  let totalConDescuento = subtotal;

  // Si no se pasa usuario, intenta obtenerlo del localStorage
  const data = usuario || JSON.parse(localStorage.getItem("usuario")) || {};
  const correo = data.correo || "";
  const fechaNacimiento = data.fechaNacimiento || "";
  const codigo = data.codigoDescuento || "";

  // Calcular edad
  let edad = 0;
  if (fechaNacimiento) {
    const hoy = new Date();
    const cumple = new Date(fechaNacimiento);
    edad = hoy.getFullYear() - cumple.getFullYear();
    const m = hoy.getMonth() - cumple.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) edad--;
  }

  // 🎂 Regalo de cumpleaños DUOC
  if (correo.includes("@duocuc.cl")) {
    beneficio = "🎂 ¡Tienes una torta gratis por tu cumpleaños con correo institucional DUOC!";
    totalConDescuento = 0;
  }
  // 👵 50% descuento por edad
  else if (edad >= 50) {
    beneficio = "👵 Descuento del 50% por ser mayor de 50 años.";
    totalConDescuento = subtotal * 0.5;
  }
  // 🎟️ Código FELICES50
  else if (codigo === "FELICES50") {
    beneficio = "🎟️ Descuento del 10% con código FELICES50.";
    totalConDescuento = subtotal * 0.9;
  }
  // Sin beneficios
  else {
    beneficio = "Sin beneficios activos.";
  }

  return { totalConDescuento, beneficio };
}

