import React from "react";
import "./BackgroundVideo.css";

const BackgroundVideo = () => {
  return (
    <>
    <div className="video-container">
      <video autoPlay loop muted playsInline>
        <source src="/background.webm" type="video/mp4" />
        Tu navegador no soporta videos.
      </video>
      <div className="contenido">
        <h3 className="bg-transparent">"El lenguaje de las flores, perfecto para cada corazón."</h3>
      </div>
    </div>
    </>
  );
};

export default BackgroundVideo;