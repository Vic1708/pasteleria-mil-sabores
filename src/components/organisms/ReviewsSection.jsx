import { useState, useEffect } from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Button from "../atoms/Button";

export default function ReviewsSection() {
  const reseñas = [
    {
      id: 1,
      nombre: "María López",
      comentario:
        "Pedí una torta de frambuesa para el cumpleaños de mi hija y fue espectacular. ¡Se notan los ingredientes frescos y el cariño!",
      imagen: "/imagenes/Review/MariaLopez.png",
      estrellas: 5,
    },
    {
      id: 2,
      nombre: "Carlos Díaz",
      comentario:
        "Excelente atención y entrega puntual. Los productos son de primer nivel, recomendadísimo para eventos familiares.",
      imagen: "/imagenes/Review/Carlos.png",
      estrellas: 5,
    },
    {
      id: 3,
      nombre: "Fernanda Silva",
      comentario:
        "Me encantó el cheesecake de maracuyá, textura perfecta y no demasiado dulce. Sin duda volveré a comprar.",
      imagen: "/imagenes/Review/FernandaSilva.png",
      estrellas: 4,
    },
    
  ];

  const [index, setIndex] = useState(0);

  // 🔄 Cambiar reseña automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reseñas.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔘 Funciones para cambiar manualmente
  const handleNext = () => setIndex((prev) => (prev + 1) % reseñas.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + reseñas.length) % reseñas.length);

  const reseña = reseñas[index];

  return (
    <section
      style={{
        backgroundColor: "#fffaf4",
        padding: "70px 20px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          color: "#8b4513",
          fontSize: "2rem",
          marginBottom: "40px",
          fontFamily: "Pacifico",
        }}
      >
        💬 Lo que dicen nuestros clientes
      </h2>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px 30px",
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
          transition: "all 0.6s ease-in-out",
        }}
      >
        <Image
          src={reseña.imagen}
          alt={reseña.nombre}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "15px",
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            color: "#8b4513",
            fontSize: "1.2rem",
            marginBottom: "5px",
          }}
        >
          {reseña.nombre}
        </Text>

        <div style={{ color: "#ffb400", marginBottom: "10px" }}>
          {"★".repeat(reseña.estrellas)}
          {"☆".repeat(5 - reseña.estrellas)}
        </div>

        <Text
          style={{
            fontStyle: "italic",
            color: "#444",
            lineHeight: "1.6",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          “{reseña.comentario}”
        </Text>
      </div>

      {/* 🔘 Controles de navegación */}
      <div
        style={{
          marginTop: "25px",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <Button
          onClick={handlePrev}
          style={{
            backgroundColor: "#ffb6b9",
            color: "white",
            padding: "8px 15px",
            borderRadius: "50%",
            fontWeight: "bold",
          }}
        >
          ‹
        </Button>
        <Button
          onClick={handleNext}
          style={{
            backgroundColor: "#ffb6b9",
            color: "white",
            padding: "8px 15px",
            borderRadius: "50%",
            fontWeight: "bold",
          }}
        >
          ›
        </Button>
      </div>

      {/* 🔘 Indicadores */}
      <div style={{ marginTop: "15px" }}>
        {reseñas.map((_, i) => (
          <span
            key={i}
            style={{
              height: "10px",
              width: "10px",
              margin: "0 5px",
              backgroundColor: i === index ? "#8b4513" : "#ddd",
              borderRadius: "50%",
              display: "inline-block",
              transition: "background-color 0.3s",
            }}
          ></span>
        ))}
      </div>
    </section>
  );
}
