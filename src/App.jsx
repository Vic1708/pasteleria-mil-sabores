import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Catalogo from "./components/pages/Catalogo";
import Registro from "./components/pages/Registro";
import Carrito from "./components/pages/Carrito";
import Perfil from "./components/pages/Perfil";
import Checkout from "./components/pages/Checkout";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/routes/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
