import { useNavigate } from "react-router-dom";

const FailurePayment = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-container">
      <h2>❌ Pago rechazado</h2>
      <p>Hubo un problema con tu pago. Inténtalo de nuevo.</p>
      <button onClick={() => navigate("/cart")}>Volver al carrito</button>
    </div>
  );
};

export default FailurePayment;