import { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import "./ProductCard.css";
import { useNavigate } from "react-router";

const ProductCard = () => {
  const prod = useSelector((state) => state.products.selectedProduct);
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate()

  const handleClick = () => {
    const currentCart = JSON.parse(localStorage.getItem("cartProduct")) || [];
    currentCart.push(prod);
    localStorage.setItem("cartProduct", JSON.stringify(currentCart));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2300);
  };

  if (!prod) {
    navigate("/Catalogo");
    return null;
  }

  return (
    <>
      <NavBar colorNav="red" />
      <div className="body">
        <div className="container">
          <div className="imgBx">
            <img src={prod.imageUrl} alt={prod.title || "Producto"} />
          </div>
          <div className="details">
            <div className="content">
              <h2>{prod.title || "Sin título"}</h2>
              <p>{prod.description || "Sin descripción"}</p>
              <h3>
                {prod.price
                  ? `$${prod.price.toLocaleString()} ARS`
                  : "Precio no disponible"}
              </h3>

              <div className="button-animation-container">
                <div className={`btn-wrapper ${isAdded ? "add" : ""}`}>
                  <button
                    className="add-to-cart buttonCart"
                    onClick={() => handleClick(prod)}
                    aria-label="Add to cart"
                  >
                    <span className="btn-text">Agregar al carrito</span>
                  </button>

                  <svg
                    className="icon-loader-check"
                    x="0px"
                    y="0px"
                    width="471.197px"
                    height="471.197px"
                    viewBox="0 0 510 510"
                    overflow="inherit"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <g id="loader">
                      <circle
                        className="circle"
                        fill="transparent"
                        stroke="#41BD59"
                        strokeWidth="48"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        cx="250"
                        cy="250"
                        r="212.599"
                      />
                      <polyline
                        className="check"
                        fill="none"
                        stroke="#41BD59"
                        strokeWidth="32"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="227.599,322.099 290.599,259.099 180.599,149.099"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
