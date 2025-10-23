import DefaultLayout from "../templates/DefaultLayout";
import RegisterForm from "../organisms/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();

  const handleRegister = (user) => {
    localStorage.setItem("usuario", JSON.stringify(user));
    alert("Usuario registrado correctamente 🎉 Ahora puedes iniciar sesión.");
    navigate("/login");
  };

  return (
    <DefaultLayout>
      <h1>Registro</h1>
      <RegisterForm onSubmit={handleRegister} />
    </DefaultLayout>
  );
}
