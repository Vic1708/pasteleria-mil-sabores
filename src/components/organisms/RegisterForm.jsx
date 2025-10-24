import { useState } from "react";
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
    codigoDescuento: "",
  });

  const [errors, setErrors] = useState({});

  const validarCampo = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "nombre":
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(value))
          errorMsg = "Debe tener al menos 3 letras y no incluir números.";
        break;
      case "correo":
        if (value.length < 3 || !value.includes("@"))
          errorMsg = "Debe ingresar un correo válido que contenga '@'.";
        break;
      case "fechaNacimiento":
        if (!value) errorMsg = "Debe ingresar su fecha de nacimiento.";
        break;
      case "direccion":
        if (value.trim() === "") errorMsg = "Debe ingresar una dirección válida.";
        break;
      case "password":
        if (value.length < 6)
          errorMsg = "La contraseña debe tener al menos 6 caracteres.";
        break;
      case "confirmPassword":
        if (value !== user.password)
          errorMsg = "Las contraseñas no coinciden.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validarCampo(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const camposConError = Object.values(errors).some((error) => error !== "");
    
    // Excluir codigoDescuento de la validación de campos vacíos (es opcional)
    const camposObligatorios = { ...user };
    delete camposObligatorios.codigoDescuento;
    const camposVacios = Object.values(camposObligatorios).some((campo) => campo.trim() === "");
    
    if (camposConError || camposVacios) {
      alert("Por favor, corrija los errores antes de continuar.");
      return;
    }
    onSubmit(user);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <Text as="h2" className="register-title">
        Registro
      </Text>

      {[
        { name: "nombre", type: "text", placeholder: "Nombre completo" },
        { name: "correo", type: "email", placeholder: "Correo electrónico" },
        { name: "fechaNacimiento", type: "date", placeholder: "Fecha de nacimiento" },
        { name: "direccion", type: "text", placeholder: "Dirección" },
        { name: "password", type: "password", placeholder: "Contraseña" },
        { name: "confirmPassword", type: "password", placeholder: "Confirmar contraseña" },
        { name: "codigoDescuento", type: "text", placeholder: "Código de descuento (opcional, ej: FELICES50)" },
      ].map((field) => (
        <div key={field.name} className="input-group">
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={user[field.name]}
            onChange={handleChange}
            className={errors[field.name] ? "input-error" : ""}
            required={field.name !== "codigoDescuento"}
          />
          {errors[field.name] && (
            <small className="error-text">{errors[field.name]}</small>
          )}
        </div>
      ))}

      <Button type="submit" className="btn-registrar">
        Registrar
      </Button>
    </form>
  );
}
