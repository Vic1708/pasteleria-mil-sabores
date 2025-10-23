// src/components/organisms/Footer.jsx
import Text from "../atoms/Text";

export default function Footer() {
  return (
    <footer>
      <Text size="small">
        © 2025 Pastelería Mil Sabores — Todos los derechos reservados
      </Text>
      <div style={{ marginTop: "10px" }}>
        <a href="#">Instagram</a> |
        <a href="#" style={{ margin: "0 6px" }}>Facebook</a> |
        <a href="#">WhatsApp</a>
      </div>
    </footer>
  );
}
