import DefaultLayout from "../templates/DefaultLayout";
import CartSummary from "../organisms/CartSummary";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <DefaultLayout>
      <CartSummary onCheckout={handleCheckout} />
    </DefaultLayout>
  );
}
