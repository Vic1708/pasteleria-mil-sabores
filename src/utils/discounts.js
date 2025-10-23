// src/utils/discounts.js
export function calcularDescuentoCarrito(cart, usuario = null) {
  const user =
    usuario || JSON.parse(localStorage.getItem("usuario")) || {};
  const correo = user.correo || "";
  const fechaNacimiento = user.fechaNacimiento || "";
  const codigo = user.codigoDescuento || "";

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

  // 💰 Calcular subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  if (subtotal <= 0) {
    return { subtotal: 0, totalConDescuento: 0, beneficio: "" };
  }

  let total = subtotal;
  let beneficio = "Sin beneficios activos.";

  // 🎂 1. Cumpleaños + correo DUOC = torta de regalo (una torta)
  if (esCumple && correo.includes("@duocuc.cl")) {
    // Buscar una torta o pastel en el carrito
    const unidades = [];
    cart.forEach((it) => {
      const qty = it.quantity || 1;
      const esTorta =
        ((it.category || "") + " " + (it.name || ""))
          .toLowerCase()
          .includes("torta") ||
        (it.category || "").toLowerCase().includes("pastel");
      for (let i = 0; i < qty; i++) unidades.push({ price: it.price, esTorta });
    });

    const tortas = unidades.filter((u) => u.esTorta);
    const pool = tortas.length ? tortas : unidades; // si no hay tortas, el ítem más barato

    const tortaGratis = Math.min(...pool.map((u) => u.price));
    total = Math.max(0, subtotal - tortaGratis);
    beneficio =
      "🎂 ¡Tienes una torta gratis por tu cumpleaños con correo institucional DUOC!";
  }

  // 👵 2. Si no cumple lo anterior y tiene ≥50 años → 50% en todo
  else if (edad >= 50) {
    total = subtotal * 0.5;
    beneficio = "👵 Descuento del 50% por ser mayor de 50 años.";
  }

  // 🎟️ 3. Si no cumple lo anterior y tiene código FELICES50 → 10% en todo
  else if (codigo === "FELICES50") {
    total = subtotal * 0.9;
    beneficio = "🎟️ 10% de descuento de por vida (código FELICES50).";
  }

  // 🧾 Si no aplica ninguno
  else {
    beneficio = "Sin beneficios activos.";
  }

  return {
    subtotal,
    totalConDescuento: Math.round(total),
    beneficio,
  };
}
