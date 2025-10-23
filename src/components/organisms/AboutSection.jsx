import Image from "../atoms/Image";

export default function AboutSection() {
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        backgroundColor: "#fffaf4",
        padding: "60px 20px",
        borderTop: "2px solid #f5d2c0",
      }}
    >
      <div style={{ maxWidth: "500px" }}>
        <h2 style={{ color: "#8b4513", marginBottom: "15px" }}>¿Quiénes somos?</h2>
        <p style={{ color: "#333", lineHeight: "1.6" }}>
          En <strong>Pastelería Mil Sabores</strong> celebramos la repostería artesanal chilena con 
          más de cinco décadas de experiencia. Participamos en el Guinness Record de la torta más grande del mundo en 1995,
          y seguimos creando postres que combinan tradición, innovación y amor.
        </p>
        <p style={{ marginTop: "10px" }}>
          Nuestra misión es ofrecer dulzura, calidad y una experiencia inolvidable a cada cliente.
        </p>
      </div>
      <Image
        src="/public/imagenes/logo.png"
        alt="Mil Sabores"
        style={{
          width: "260px",
          borderRadius: "50%",
          boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
        }}
      />
    </section>
  );
}
