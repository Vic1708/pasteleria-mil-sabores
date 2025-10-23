// src/components/molecules/ProductFilter.jsx
export default function ProductFilter({ options, value, onChange }) {
  return (
    <select
      className="input"
      value={value}
      onChange={onChange}
      style={{ maxWidth: "300px", margin: "10px auto", display: "block" }}
    >
      <option value="">Todas las categorías</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}
