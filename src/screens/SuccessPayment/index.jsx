import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/"); // Redirigir a la página principal después de unos segundos
    }, 5000);
  }, [navigate]);

  return (
    <div className="payment-container">
      <h2>✅ ¡Pago exitoso!</h2>
      <p>Tu compra ha sido procesada correctamente.</p>
      <p>Serás redirigido a la página principal en unos segundos...</p>
    </div>
  );
};

export default SuccessPayment;