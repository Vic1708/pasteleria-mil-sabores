import { useState, useEffect } from "react";
import DefaultLayout from "../templates/DefaultLayout";
import SearchBar from "../molecules/SearchBar";
import ProductFilter from "../molecules/ProductFilter";
import ProductGrid from "../organisms/ProductGrid";
import { products } from "../../data/products";

export default function Catalogo() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
    alert(`${product.name} agregado al carrito 🧁`);
  };

  const handleSearch = () => setSearch(search.trim());

  // Filtro combinado
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || p.category === category)
  );

  // Categorías únicas
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <DefaultLayout>
      <h1>Catálogo de Productos 🧁</h1>

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />

      <ProductFilter
        options={categories}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <ProductGrid products={filteredProducts} onAdd={handleAdd} />
    </DefaultLayout>
  );
}
