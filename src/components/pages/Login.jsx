import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../templates/DefaultLayout";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (result.ok) navigate("/perfil");
    else setError(result.msg);
  };

  return (
    <DefaultLayout>
      <h1>Iniciar sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <FormField
          label="Correo electrónico"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Entrar</Button>
      </form>
    </DefaultLayout>
  );
}
