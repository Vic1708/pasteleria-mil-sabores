import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Image from "../atoms/Image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // 🔹 Función para contar productos totales en el carrito
    const updateCount = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const total = savedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(total);
    };

    // Cargar contador al inicio
    updateCount();

    // 🔹 Escuchar eventos personalizados y cambios en localStorage
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);

    // Limpiar listeners
    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-inner container">
        <div className="row" style={{ alignItems: "center", gap: "8px" }}>
          <Image src="/imagenes/logo.png" alt="Mil Sabore" width="50px" />
          <h2 style={{ fontFamily: "Pacifico", color: "#8b4513" }}>Pasteleria Mil Sabores</h2>
        </div>

        <div className="row" style={{ gap: "14px" }}>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>

          <Link to="/carrito">
            🛒 Carrito
            {cartCount > 0 && (
              <span
                style={{
                  marginLeft: "4px",
                  backgroundColor: "#8b4513",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 8px",
                  fontSize: "12px",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/blog">Blog</Link>

          {user ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <button
                onClick={handleLogout}
                className="btn"
                style={{
                  padding: "6px 10px",
                  border: "none",
                  backgroundColor: "#ffb6b9",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
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
