import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiTransferAlt } from "react-icons/bi";
import { SiMercadopago } from "react-icons/si";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./Cart.css";
import EmptyCart from "../../components/EmptyCart";
import Swal from "sweetalert2";
import BankTransfer from "../BankTransfer";
import { selectUser } from "../../Authetications/authSlice";
import createPreference from "../../GlobalState/apiSlice/apiSlice"
// Clave pública de Mercado Pago
const MERCADO_PAGO_PUBLIC_KEY = "APP_USR-b0c1c712-43ed-4117-bd2f-364227ba75b6";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const [error, setError] = useState(null);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showFinalizeButton, setShowFinalizeButton] = useState(true);
  const currentUser = useSelector(selectUser);

  // Inicializar Mercado Pago
  useEffect(() => {
    initMercadoPago(MERCADO_PAGO_PUBLIC_KEY);
  }, []);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartProduct")) || [];
    setCartItems(storedCart);
  }, []);

  // Calcular precio total con o sin descuento
  const totalPrice = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
    return selectedPayment === "transfer" ? subtotal * 0.9 : subtotal;
  }, [cartItems, selectedPayment]);

  // Eliminar producto del carrito
  const removeItemFromCart = (itemId) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cartItems.filter((item) => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem("cartProduct", JSON.stringify(updatedCart));
        Swal.fire("¡Eliminado!", "El producto ha sido eliminado del carrito.", "success");
      }
    });
  };

  const handleCheckout = async () => {
    try {
      if (selectedPayment === "mercado") {
        const items = cartItems.map((item) => ({
          title: item.title,
          unit_price: Number(item.price),
          quantity: 1,
          currency_id: "ARS",
        }));

        console.log("Enviando items al backend:", items);

        const response = await createPreference(items);
        console.log("Respuesta del backend:", response);

        if (response?.id) {
          setPreferenceId(response.id);
          setShowFinalizeButton(false);
        } else {
          throw new Error("No se recibió un ID de preferencia.");
        }
      } else if (selectedPayment === "transfer") {
        setShowBankTransfer(true);
        setShowFinalizeButton(false);
      }
    } catch (err) {
      console.error("Error al procesar el pago:", err);
      setError(err?.message || "Error al procesar el pago. Intenta nuevamente.");
    }
  };

  return (
    <div className="cart">
      <NavBar />
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="container-cart">
          <h2 className="text-center">Carrito De Compras</h2>
          <div className="content-div">
            <div className="content-product">
              {cartItems.map((item) => (
                <div className="product-cart" key={item.id}>
                  <img className="img-product" src={item.imageUrl} alt={item.title} />
                  <div className="info-product-cart">
                    <div className="row-product">
                      <h3 className="product-title">
                        {item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title}
                      </h3>
                      <RiDeleteBin6Line onClick={() => removeItemFromCart(item.id)} className="btn-remove-product" />
                    </div>
                    <p className="product-price">${item.price} ARS</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="content-payment">
              <div className="content-payment-total">
                <h3>Total</h3>
                <p>${totalPrice.toLocaleString()}</p>
                {selectedPayment === "transfer" && (
                  <p className="discount-message">Tienes un 10% de descuento con transferencia</p>
                )}
              </div>
              <div className="content-payment-buttons">
                {showFinalizeButton && (
                  <button
                    className="finish-buy"
                    onClick={handleCheckout}
                    disabled={!selectedPayment || cartItems.length === 0}
                  >
                    Finalizar Compra
                  </button>
                )}
                {preferenceId && selectedPayment === "mercado" && <Wallet initialization={{ preferenceId }} />}
                {showBankTransfer && selectedPayment === "transfer" && <BankTransfer />}
                <button className="continue-buying" onClick={() => navigate("/Catalogo")}>
                  Seguir comprando
                </button>
              </div>
            </div>
          </div>
          <div className="content-method-payment">
            <h2 className="title-method-payment">Selecciona un Método de Pago</h2>
            <div className="buttons-method-payment">
              <label className={`button-method ${selectedPayment === "transfer" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={selectedPayment === "transfer"}
                  onChange={() => setSelectedPayment("transfer")}
                />
                <BiTransferAlt /> Transferencia Bancaria (10% OFF)
              </label>
              <label className={`button-method ${selectedPayment === "mercado" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="mercado"
                  checked={selectedPayment === "mercado"}
                  onChange={() => setSelectedPayment("mercado")}
                />
                <SiMercadopago color="blue" /> Mercado Pago
              </label>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default Cart;