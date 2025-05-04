import React, { useState, useEffect } from "react";
import "../styles/ScrollToTopStyle.css";

// Este componente es un botón que aparece cuando el usuario hace scroll hacia abajo en la página. Al hacer clic, el botón desplaza suavemente la vista hacia la parte superior de la página.

const ScrollToTop = () => {
  // Controla la visibilidad del botón
  const [visible, setVisible] = useState(false);

  // Mostrar el botón solo si se ha hecho scroll más allá de 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Función que realiza el scroll suave hasta arriba

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? "scroll-to-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Ir al inicio"
    >
      &#8679;
    </button>
  );
};

export default ScrollToTop;
