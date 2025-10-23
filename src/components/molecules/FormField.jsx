// src/components/molecules/FormField.jsx
import Input from "../atoms/Input";
import Text from "../atoms/Text";

export default function FormField({ label, type, name, value, onChange, placeholder, required }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <Text size="small" style={{ fontWeight: "600" }}>
        {label}
      </Text>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
