// src/components/pages/Catalogo.jsx
import DefaultLayout from "../templates/DefaultLayout";
import ProductGrid from "../organisms/ProductGrid";
import SearchBar from "../molecules/SearchBar";
import ProductFilter from "../molecules/ProductFilter";
import { useState } from "react";

export default function Catalogo() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const products = [
    { id: 1, name: "Torta Chocolate", price: 12900, category: "Tortas", image: "/imagenes/pastel.png" },
    { id: 2, name: "Pie de Limón", price: 9900, category: "Pie", image: "/imagenes/pastel.png" },
    { id: 3, name: "Brownie", price: 6500, category: "Dulces", image: "/imagenes/pastel.png" },
  ];

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || p.category === category)
  );

  return (
    <DefaultLayout>
      <h1>Catálogo 🧁</h1>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} onSearch={() => {}} />
      <ProductFilter
        options={["Tortas", "Pie", "Dulces"]}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <ProductGrid products={filtered} onAdd={() => alert("Agregado al carrito")} />
    </DefaultLayout>
  );
}
