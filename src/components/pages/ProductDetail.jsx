import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultLayout from "../templates/DefaultLayout";
import Button from "../atoms/Button";
import Title from "../atoms/Title";
import Text from "../atoms/Text";
import { products } from "../../data/products";
import { addToCart } from "../../utils/cart";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Buscar el producto por ID (convertir a número para comparación)
    const productId = parseInt(id, 10);
    const foundProduct = products.find((p) => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Cargar comentarios del localStorage
      const savedReviews = localStorage.getItem(`reviews-${productId}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    } else {
      console.error(`Producto con ID ${id} no encontrado. IDs disponibles:`, products.map(p => p.id));
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // Agregar al carrito la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    Swal.fire({
      icon: "success",
      title: "¡Agregado al carrito!",
      text: `${quantity} ${product.name} agregado(s) al carrito`,
      confirmButtonColor: "#ff6b9d",
      timer: 2000,
    });
  };

  const handleAddComment = () => {
    if (comment.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Comentario vacío",
        text: "Por favor escribe un comentario antes de enviar",
        confirmButtonColor: "#ff6b9d",
      });
      return;
    }

    const newReview = {
      id: Date.now(),
      text: comment,
      date: new Date().toLocaleDateString(),
      author: JSON.parse(localStorage.getItem("usuario"))?.nombre || "Anónimo",
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));
    setComment("");

    Swal.fire({
      icon: "success",
      title: "¡Comentario agregado!",
      text: "Gracias por tu opinión",
      confirmButtonColor: "#ff6b9d",
      timer: 1500,
    });
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return (
      <DefaultLayout>
        <div className="product-detail-container">
          <Title>Producto no encontrado</Title>
          <Button onClick={() => navigate("/catalogo")}>Volver al catálogo</Button>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Text>
            <span 
              onClick={() => navigate("/catalogo")} 
              style={{ cursor: "pointer", color: "#ff6b9d" }}
            >
              Catálogo
            </span>
            {" > "}
            <span style={{ color: "#c44569" }}>{product.category}</span>
            {" > "}
            {product.name}
          </Text>
        </div>

        {/* Sección principal del producto */}
        <div className="product-detail-main">
          {/* Imagen del producto */}
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          {/* Información del producto */}
          <div className="product-detail-info">
            <Title level={1}>{product.name}</Title>
            <Text className="product-code">Código: {product.codigo}</Text>
            <Text className="product-category">{product.category}</Text>
            
            <div className="product-price">
              <Text style={{ fontSize: "32px", fontWeight: "bold", color: "#c44569" }}>
                ${product.price.toLocaleString()}
              </Text>
            </div>

            <div className="product-description">
              <Title level={3}>Descripción</Title>
              <Text>{product.description}</Text>
            </div>

            {/* Control de cantidad */}
            <div className="quantity-control">
              <Text style={{ fontWeight: "bold", marginBottom: "10px" }}>Cantidad:</Text>
              <div className="quantity-buttons">
                <Button onClick={decreaseQuantity} variant="secondary">-</Button>
                <span className="quantity-display">{quantity}</span>
                <Button onClick={increaseQuantity} variant="secondary">+</Button>
              </div>
            </div>

            {/* Botón agregar al carrito */}
            <div className="product-actions">
              <Button onClick={handleAddToCart} variant="primary">
                Agregar al carrito
              </Button>
              <Button onClick={() => navigate("/catalogo")} variant="secondary">
                Seguir comprando
              </Button>
            </div>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div className="product-reviews-section">
          <Title level={2}>Comentarios y Opiniones</Title>
          
          {/* Formulario para agregar comentario */}
          <div className="add-review">
            <Title level={3}>Deja tu comentario</Title>
            <textarea
              className="review-textarea"
              placeholder="Escribe tu opinión sobre este producto..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
            />
            <Button onClick={handleAddComment}>Publicar comentario</Button>
          </div>

          {/* Lista de comentarios */}
          <div className="reviews-list">
            <Title level={3}>
              Comentarios ({reviews.length})
            </Title>
            {reviews.length === 0 ? (
              <Text style={{ color: "#999", fontStyle: "italic" }}>
                Aún no hay comentarios. ¡Sé el primero en opinar!
              </Text>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <Text style={{ fontWeight: "bold", color: "#ff6b9d" }}>
                      {review.author}
                    </Text>
                    <Text style={{ fontSize: "14px", color: "#999" }}>
                      {review.date}
                    </Text>
                  </div>
                  <Text>{review.text}</Text>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
