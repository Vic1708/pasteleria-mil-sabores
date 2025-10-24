import DefaultLayout from "../templates/DefaultLayout";
import HeroSection from "../organisms/HeroSection";
import ProductHighlights from "../organisms/ReviewsSection";
import AboutSection from "../organisms/AboutSection";
import MissionVisionSection from "../organisms/MissionVisionSection";


export default function Home() {
  return (
    <DefaultLayout>
      <HeroSection />
      <AboutSection /> 
      <MissionVisionSection /> 
      <ProductHighlights />
      <footer
        style={{
          textAlign: "center",
          backgroundColor: "#8b4513",
          color: "white",
          padding: "20px",
          marginTop: "40px",
        }}
      >
        © 2025 Pastelería Mil Sabores - Todos los derechos reservados
      </footer>
    </DefaultLayout>
  );
}
