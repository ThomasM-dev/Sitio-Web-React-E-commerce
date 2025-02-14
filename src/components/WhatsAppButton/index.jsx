import React from 'react';
import './WhatsAppButton.css'; 

const WhatsAppButton = () => {
    const phoneNumber = +542942442725
  const whatsappLink = `https://wa.me/${phoneNumber}`; 

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2048px-WhatsApp.svg.png"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppButton;