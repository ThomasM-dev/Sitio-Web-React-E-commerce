import React from "react";
import styled, { keyframes } from "styled-components";

// Definir animación
const scroll = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
`;

// Estilos del contenedor del banner
const BannerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background: #ffb6c1; /* Rosado claro */
  white-space: nowrap;
  position: relative;
`;

// Estilos del texto deslizante
const BannerText = styled.div`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  color: #ff69b4; /* Rosado fuerte */
  animation: ${scroll} 10s linear infinite;
  padding: 10px;
`;

const Marquee = () => {
  return (
    <BannerContainer>
      <BannerText>🎉 ¡Disfruta de envíos gratis a todo el país a partir de $100.000! 🎉</BannerText>
    </BannerContainer>
  );
};

export default Marquee;
