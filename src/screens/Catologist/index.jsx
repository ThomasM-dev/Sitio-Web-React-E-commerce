import React, { useEffect } from "react";
import "./Catologist.css";
import { useGetProductsQuery } from "../../GlobalState/productsApi";
import Spinner from "../../components/Spinner";
import NavBar from "../../components/NavBar";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setSelectedProduct } from "../../GlobalState/productSlice";

const Catologist = () => {
  const { data: florProducts, error, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (florProducts && Array.isArray(florProducts)) {
      dispatch(setProducts(florProducts)); 
    }
  }, [florProducts, dispatch]);

  
  if (isLoading) return <Spinner />;

  
  if (error) return <div>Error al obtener productos: {error.message}</div>;

  const handleProductClick = (prod) => {
    dispatch(setSelectedProduct(prod));
    navigate("/Detalle-Producto");
  };

  return (
    <>
      <NavBar colorNav="red" />
      <div className="catologist-page" style={{ zIndex: 1 }}>
        <h2 className="catologist-title">Catálogo de Productos</h2>
        <div className="product-list">
          {products && products.length > 0 ? (
            products.map((prod) => (
              <CButton
                key={prod.id}
                className="product-card"
                onClick={() => handleProductClick(prod)}
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="product-image"
                />
                <h3 className="product-title">{prod.title}</h3>
                <p className="product-price">
                  ${prod.price.toLocaleString()} ARS
                </p>
              </CButton>
            ))
          ) : (
            <div>No hay productos disponibles</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Catologist;
