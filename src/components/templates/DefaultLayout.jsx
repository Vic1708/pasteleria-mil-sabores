// src/components/templates/DefaultLayout.jsx
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container" style={{ minHeight: "70vh", marginTop: "20px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
