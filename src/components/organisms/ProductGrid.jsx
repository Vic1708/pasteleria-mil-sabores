// src/components/organisms/ProductGrid.jsx
import CardProduct from "../molecules/CardProduct";

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
      {products.map((p) => (
        <CardProduct
          key={p.id}
          image={p.image}
          name={p.name}
          price={p.price}
          category={p.category}
          onAdd={() => onAdd(p)}
        />
      ))}
    </div>
  );
}
