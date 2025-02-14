import React, { useState, useEffect, use } from "react";
import {
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  CCollapse,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import "./NavBar.css";
import { LuUser } from "react-icons/lu";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ colorNav }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartProduct")) || [];
    setCartCount(storedCart.length);
  }, []);

  const handleAcount = () => { 
      navigate("/Mi-Cuenta")
  };

  return (
    <CNavbar expand="lg" className={`navbar-bg p-2 ${visible ? 'collapse-nav' : ''}`}>
      <CContainer fluid>
        <CNavbarBrand>
          <img className="logoSit" src="/logoSit.webp" alt="Logo del Sitio" />
        </CNavbarBrand>

        <CNavbarToggler
          aria-label="Abrir menú de navegación"
          onClick={() => setVisible(!visible)}
        >
          <HiMenuAlt3 fontSize={25} style={{ color: colorNav }} />
        </CNavbarToggler>

        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className="custom-nav">
            {[{
              label: "Inicio", 
              to: "/" 
            }, {
              label: "Catálogo", 
              to: "/Catalogo"
            }, {
              label: "Preguntas Frecuentes", 
              to: "/Preguntas-Frecuentes"
            }].map(({ label, to }) => (
              <CNavItem key={label}>
                <CNavLink as={Link} to={to} className="nav-link-custom">
                  {label}
                </CNavLink>
              </CNavItem>
            ))}
          </CNavbarNav>

          <div className="profile">
            <CNavItem>
              <CNavLink as={Link} to="/Carrito" className="nav-link-custom cart-link" title="Ver carrito">
                <div className="cart-container">
                  <IoCartOutline className="icon" />
                  {cartCount > 0 && <span className="cart-counter">{cartCount}</span>}
                </div>
                <span>Carrito</span>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink className="nav-link-custom account-link" title="Mi cuenta" onClick={handleAcount}>
                <LuUser className="icon" />
                <span>Mi cuenta</span>
              </CNavLink>
            </CNavItem>
          </div>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

export default NavBar;
