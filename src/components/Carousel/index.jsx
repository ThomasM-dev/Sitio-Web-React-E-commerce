import React, { useState } from "react";
import "./Carousel.css";

const images = [
  "https://floresavenida.com.ar/imgdb/productos/imgp458_Ramo%20de%20margaritas.webp",
  "https://floresavenida.com.ar/imgdb/productos/imgp1261_Ramo%20de%20Girasoles.webp",
  "https://floresavenida.com.ar/imgdb/productos/imgp2041_Florero%20con%20flores%20estacion%20y%20rosas%20blancas.webp",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={handlePrev}>
        &#10094;
      </button>
      <div className="carousel-content">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
