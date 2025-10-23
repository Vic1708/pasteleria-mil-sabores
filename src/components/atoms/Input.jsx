// src/components/atoms/Input.jsx
export default function Input({ type = "text", name, value, onChange, placeholder, required }) {
  return (
    <input
      className="input"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
}
