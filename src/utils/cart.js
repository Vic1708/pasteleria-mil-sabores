// src/utils/cart.js
export function addToCart(product) {
  try {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Buscar si el producto ya existe
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    // 🔹 Emitir un evento global (para actualizar el contador del navbar)
    window.dispatchEvent(new Event("cartUpdated"));

    alert(`${product.name} agregado al carrito 🛒`);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
  }
}

// Leer el carrito
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Vaciar el carrito
export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
}
