// src/components/molecules/ProductFilter.jsx
export default function ProductFilter({ options, value, onChange }) {
  return (
    <select className="input" value={value} onChange={onChange}>
      <option value="">Todas las categorías</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
