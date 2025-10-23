import { useState, useEffect } from "react";
import Button from "../atoms/Button";
import Image from "../atoms/Image";

export default function HeroSection() {
  const slides = [
    {
      id: 1,
      imagen: "/imagenes/Hero/Hero1.png",
      titulo: "Tradición y dulzura en cada bocado ",
      descripcion:
        "50 años de historia pastelera con recetas familiares, ingredientes frescos y mucho amor.",
      boton: "Ver catálogo",
      link: "/catalogo",
    },
    {
      id: 2,
      imagen: "/imagenes/Hero/Hero2.png",
      titulo: "Variedad de sabores y colores",
      descripcion:
        "Explora nuestra selección de pasteles artesanales y tortas personalizadas para cada ocasión.",
      boton: "Conócenos",
      link: "/perfil",
    },
    {
      id: 3,
      imagen: "/imagenes/Hero/Hero3.png",
      titulo: "Sabor artesanal con historia",
      descripcion:
        "Endulzando tus momentos desde 1975. Pasteles hechos con pasión, técnica y amor.",
      boton: "Contáctanos",
      link: "/",
    },
  ];

  const [index, setIndex] = useState(0);

  // 🔄 Cambio automático cada 6 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // 🔘 Navegación manual
  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[index];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        height: "80vh",
        borderRadius: "0 0 30px 30px",
      }}
    >
      {/* Imagen de fondo */}
      <div
        style={{
          backgroundImage: `url(${slide.imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
          width: "100%",
          filter: "brightness(0.65)",
          transition: "background-image 1s ease-in-out",
        }}
      ></div>

      {/* Texto superpuesto */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          padding: "20px",
          maxWidth: "700px",
          animation: "fadeIn 1s ease",
        }}
      >
        <h1
          style={{
            fontFamily: "Pacifico",
            fontSize: "3rem",
            marginBottom: "10px",
          }}
        >
          {slide.titulo}
        </h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>
          {slide.descripcion}
        </p>

        <Button
          onClick={() => (window.location.href = slide.link)}
          style={{
            backgroundColor: "#ffb6b9",
            color: "#fff",
            marginTop: "25px",
            fontWeight: "bold",
            padding: "12px 24px",
            fontSize: "1rem",
            borderRadius: "25px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {slide.boton}
        </Button>
      </div>

      {/* Controles manuales */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 30px",
          transform: "translateY(-50%)",
        }}
      >
        <button
          onClick={handlePrev}
          style={controlBtnStyle}
          aria-label="Anterior"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          style={controlBtnStyle}
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      {/* Indicadores (puntos) */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: i === index ? "#ffb6b9" : "rgba(255,255,255,0.6)",
              transition: "background-color 0.3s ease",
            }}
          ></span>
        ))}
      </div>
    </section>
  );
}

// 🎨 Estilos para los botones laterales
const controlBtnStyle = {
  backgroundColor: "rgba(255, 182, 185, 0.9)",
  color: "#fff",
  border: "none",
  fontSize: "2rem",
  width: "45px",
  height: "45px",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "transform 0.2s ease, background 0.3s",
};

