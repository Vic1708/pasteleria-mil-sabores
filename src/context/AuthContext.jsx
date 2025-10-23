// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// 👉 Crear el contexto
export const AuthContext = createContext();

// 👉 Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);

// 👉 Componente proveedor de autenticación
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔹 Cargar sesión guardada al iniciar la app
  useEffect(() => {
    const savedUser = localStorage.getItem("session_user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 🔹 Iniciar sesión (validación contra usuario registrado)
  const login = (email, password) => {
    const registro = JSON.parse(localStorage.getItem("usuario"));

    if (registro && registro.correo === email && registro.password === password) {
      localStorage.setItem("session_user", JSON.stringify(registro));
      setUser(registro);
      return { ok: true };
    }

    return { ok: false, msg: "Correo o contraseña inválidos." };
  };

  // 🔹 Cerrar sesión
  const logout = () => {
    localStorage.removeItem("session_user");
    setUser(null);
  };

  // 🔹 Proveer los datos y funciones a toda la app
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 👉 Exportar por defecto para que Vite no marque error en Fast Refresh
export default AuthProvider;
