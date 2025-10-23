// src/utils/discounts.js
export function calcularDescuento(usuario, total, codigo) {
  if (!usuario) return total;

  const hoy = new Date();
  const fechaNac = new Date(usuario.fechaNacimiento);
  const edad = hoy.getFullYear() - fechaNac.getFullYear();
  const cumpleHoy =
    fechaNac.getDate() === hoy.getDate() &&
    fechaNac.getMonth() === hoy.getMonth();

  // 1️⃣ Cumpleaños + correo Duoc → torta gratis
  if (cumpleHoy && usuario.correo?.includes("@duocuc.cl")) {
    return 0;
  }

  // 2️⃣ Edad ≥ 50 → 50% descuento
  if (edad >= 50) {
    return total * 0.5;
  }

  // 3️⃣ Código FELICES50 → 10% descuento
  if (codigo && codigo.toUpperCase() === "FELICES50") {
    return total * 0.9;
  }

  return total; // Sin beneficio
}
