// src/components/pages/Home.jsx
import DefaultLayout from "../templates/DefaultLayout";
import ProductGrid from "../organisms/ProductGrid";
import { useState } from "react";
import { products } from "../../data/products";

export default function Home() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const handleAdd = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    const updated = existing
      ? cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    alert(`${product.name} agregado al carrito 🧁`);
  };

  return (
    <DefaultLayout>
      <h1>Bienvenido a Mil Sabores 🍰</h1>
      <p>Descubre nuestros productos destacados:</p>
      <ProductGrid products={products} onAdd={handleAdd} />
    </DefaultLayout>
  );
}
