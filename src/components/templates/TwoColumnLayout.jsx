// src/components/templates/TwoColumnLayout.jsx
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

export default function TwoColumnLayout({ left, right }) {
  return (
    <>
      <Navbar />
      <main
        className="container grid"
        style={{
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          alignItems: "start",
          marginTop: "20px",
        }}
      >
        <section>{left}</section>
        <aside>{right}</aside>
      </main>
      <Footer />
    </>
  );
}
