import React from 'react';
import './EmptyCart.css'; 
import { useNavigate } from 'react-router';

const EmptyCart = () => {
  const navigate = useNavigate()
  return (
    <div className="carrito-vacio">
      <p className="mensaje">No hay productos en el carrito</p>
      <button className="comprar-btn" onClick={() =>  navigate("/Catalogo")}>Comprar</button>
    </div>
  );
};

export default EmptyCart;