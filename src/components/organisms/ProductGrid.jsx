import { useState } from "react";
import CardProduct from "../molecules/CardProduct";
import MessageModal from "../molecules/MessageModal";

export default function ProductGrid({ products, onAdd }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handlePersonalize = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirm = (product, mensaje) => {
    const productWithMessage = { ...product, mensaje };
    onAdd(productWithMessage);
  };

  const handleClose = () => setSelectedProduct(null);

  if (products.length === 0)
    return <p style={{ textAlign: "center" }}>No se encontraron productos.</p>;

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {products.map((p) => (
          <CardProduct
            key={p.id}
            id={p.id}
            image={p.image}
            name={p.name}
            price={p.price}
            category={p.category}
            onAdd={() => onAdd(p)}
            onPersonalize={() => handlePersonalize(p)}
          />
        ))}
      </div>

      {selectedProduct && (
        <MessageModal
          product={selectedProduct}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      )}
    </>
  );
}
