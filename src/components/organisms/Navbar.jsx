import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Image from "../atoms/Image";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-inner container">
        <div className="row" style={{ alignItems: "center", gap: "8px" }}>
          <Image src="/imagenes/logo.png" alt="Mil Sabores" width="50px" />
          <h2 style={{ fontFamily: "Pacifico", color: "#8b4513" }}>Mil Sabores</h2>
        </div>

        <div className="row" style={{ gap: "14px" }}>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/carrito">Carrito</Link>

          {user ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <button onClick={handleLogout} className="btn" style={{ padding: "6px 10px" }}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/registro">Registro</Link>
              <Link to="/login">Iniciar sesión</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
