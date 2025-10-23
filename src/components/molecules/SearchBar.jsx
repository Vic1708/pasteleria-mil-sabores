// src/components/molecules/SearchBar.jsx
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="row" style={{ justifyContent: "center" }}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Buscar producto..."
        style={{ width: "70%" }}
      />
      <Button onClick={onSearch}>Buscar</Button>
    </div>
  );
}
