import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useProperties } from '../context/PropertiesContext';
import useWindowSize from '../customHook/useWindowSize';

//Estilado del carousel
import '../styles/carouselHomeComponent.css';

export const CarouselHomeComponent = () => {
  const properties = useProperties();
  
  // Usamos useWindowSize para obtener el tamaño de la ventana
  const { width } = useWindowSize();  // Obtenemos solo el 'width'

  const [carouselProperties, setCarouselProperties] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const autoplayRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const userInteracting = useRef(false);

  // Ajustamos el 'step' según el tamaño de la ventana
  let step = 1;
  if (width >= 600 && width < 1024) step = 2;  // Tablet: 2 imágenes
  if (width >= 1024) step = 3;  // Desktop: 3 imágenes

  const totalPages = Math.ceil(carouselProperties.length / step); // Páginas totales

  useEffect(() => {
    if (!properties) return;

    const filtered = [...properties]
      .filter((property) => property.pics?.length > 0 && property.last_update)
      .sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
      .slice(0, 8); // Limita las propiedades

    setCarouselProperties(filtered);
  }, [properties]);

  // Cambia la diapositiva siguiente
  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalPages);
    resetAutoplay();
  };

  // Cambia la diapositiva anterior
  const goToPreviusSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalPages) % totalPages);
    resetAutoplay();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    pauseAutoplayTemporarily();
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistanceX = touchStartX.current - touchEndX.current;
    if (swipeDistanceX > 50) {
      goToNextSlide();
    } else if (swipeDistanceX < -50) {
      goToPreviusSlide();
    }
  };

  // Inicia el autoplay
  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!userInteracting.current && carouselProperties.length > 0) {
        goToNextSlide();
      }
    }, 4000);
  };

  const pauseAutoplayTemporarily = () => {
    clearInterval(autoplayRef.current);
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, 3000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayRef.current);
    clearTimeout(pauseTimeoutRef.current);
    startAutoplay();
  };

  useEffect(() => {
    if (carouselProperties.length > 0) {
      startAutoplay();
    }
    return () => {
      clearInterval(autoplayRef.current);
      clearTimeout(pauseTimeoutRef.current);
    };
  }, [carouselProperties]);

  if (carouselProperties.length === 0) return null;

  return (
    <div className="carousel-container-component" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {/* Flecha izquierda */}
      {width >= 600 && (
        <button className="carousel-arrow-left" onClick={goToPreviusSlide}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Contenedor de imágenes */}
      <div className="carousel-image-container">
        {[...Array(step)].map((_, offset) => {
          const index = (currentSlideIndex * step + offset) % carouselProperties.length;
          const property = carouselProperties[index];
          return (
            <img key={index} src={property.pics[0]} alt={`Propiedad ${index + 1}`} className="carousel-image"/>
          );
        })}
      </div>

      {/* Flecha derecha */}
      {width >= 600 && (
        <button className="carousel-arrow-right" onClick={goToNextSlide}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Indicadores de bullets */}
      {width >= 1024 && (
        <div className="carousel-indicator-group">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span key={i} className={`carousel-indicator-dot ${i === currentSlideIndex ? 'active' : ''}`} 
            onClick={() => {
              setCurrentSlideIndex(i);
              resetAutoplay();
            }}></span>
          ))}
        </div>
      )}
    </div>
  );
};