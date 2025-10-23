import Swal from "sweetalert2";
import DefaultLayout from "../templates/DefaultLayout";
import RegisterForm from "../organisms/RegisterForm";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const navigate = useNavigate();

  const handleRegister = (user) => {
    // Guarda el usuario en localStorage
    localStorage.setItem("usuario", JSON.stringify(user));

    // 🚀 Muestra alerta moderna con SweetAlert2
    Swal.fire({
      title: "¡Registro exitoso! 🎉",
      text: "Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.",
      icon: "success",
      background: "#fff5e6", // beige
      color: "#8b4513", // café
      confirmButtonColor: "#ffb6b9", // rosa pastel
      confirmButtonText: "Iniciar sesión",
      customClass: {
        popup: "rounded-4xl shadow-lg", // bordes redondeados y sombra suave
      },
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <DefaultLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "#fff5e6",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff5e6",
            padding: "40px 45px",
            borderRadius: "20px",
            boxShadow: "0 8px 25px rgba(139, 69, 19, 0.1)",
            maxWidth: "440px",
            width: "100%",
            border: "1px solid rgba(139, 69, 19, 0.15)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#8b4513",
              fontFamily: "Pacifico",
            }}
          >
            Registro
          </h2>

          <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
    </DefaultLayout>
  );
}
