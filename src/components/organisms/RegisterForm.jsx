import { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

export default function RegisterForm({ onSubmit }) {
  const [user, setUser] = useState({
    nombre: "",
    correo: "",
    fechaNacimiento: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!user.nombre || !user.correo || !user.fechaNacimiento || !user.direccion) {
      setError("Por favor, completa todos los campos requeridos.");
      return;
    }

    if (!user.password || !user.confirmPassword) {
      setError("Debes ingresar y confirmar tu contraseña.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Validar si el correo ya está registrado
    const existing = JSON.parse(localStorage.getItem("usuario"));
    if (existing && existing.correo === user.correo) {
      setError("Este correo ya está registrado.");
      return;
    }

    // Si todo es válido
    setError("");
    onSubmit(user);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <h2 style={{ textAlign: "center" }}>Formulario de Registro</h2>
      {error && <Text style={{ color: "red", marginBottom: "10px" }}>{error}</Text>}

      <FormField
        label="Nombre completo"
        name="nombre"
        value={user.nombre}
        onChange={handleChange}
        required
      />
      <FormField
        type="email"
        label="Correo electrónico"
        name="correo"
        value={user.correo}
        onChange={handleChange}
        required
      />
      <FormField
        type="date"
        label="Fecha de nacimiento"
        name="fechaNacimiento"
        value={user.fechaNacimiento}
        onChange={handleChange}
      />
      <FormField
        label="Dirección"
        name="direccion"
        value={user.direccion}
        onChange={handleChange}
        required
      />
      <FormField
        type="password"
        label="Contraseña"
        name="password"
        value={user.password}
        onChange={handleChange}
        required
      />
      <FormField
        type="password"
        label="Confirmar contraseña"
        name="confirmPassword"
        value={user.confirmPassword}
        onChange={handleChange}
        required
      />

      <Button type="submit">Registrar</Button>
    </form>
  );
}
