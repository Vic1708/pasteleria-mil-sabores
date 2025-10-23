import { useState } from "react";
import Button from "../atoms/Button";
import Input from "../atoms/Input";

export default function MessageModal({ product, onConfirm, onClose }) {
  const [mensaje, setMensaje] = useState("");

  const handleConfirm = () => {
    onConfirm(product, mensaje);
    setMensaje("");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2>Mensaje para tu torta 🎂</h2>
        <p style={{ marginBottom: "10px" }}>
          Escribe una dedicatoria para personalizar tu pedido:
        </p>
        <Input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Ej: Feliz cumpleaños, mamá 🎉"
        />
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <Button onClick={handleConfirm}>Confirmar</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </div>
    </div>
  );
}
