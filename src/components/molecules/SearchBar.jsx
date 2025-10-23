// src/components/molecules/SearchBar.jsx
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="row" style={{ justifyContent: "center", marginBottom: "10px" }}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Buscar producto por nombre..."
        style={{ width: "70%" }}
      />
      <Button onClick={onSearch}>Buscar</Button>
    </div>
  );
}
