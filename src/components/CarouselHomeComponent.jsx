import React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useProperties } from '../context/PropertiesContext';
import useWindowSize from '../customHook/useWindowSize';

//Estilado del carousel
import '../styles/carouselHomeComponent.css';

export const CarouselHomeComponent = ({ properties: filteredProperties }) => {
  const associationProperties = useProperties();
  const properties = filteredProperties ?? associationProperties;
  
  // Usamos useWindowSize para obtener el tamaño de la ventana
  const { width } = useWindowSize();  // Obtenemos solo el 'width'

  const carouselProperties = useMemo(() => [...(properties || [])]
    .filter(property => property.pics?.length > 0 && property.last_update)
    .sort((first, second) => new Date(second.last_update) - new Date(first.last_update))
    .slice(0, 8), [properties]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const pauseUntilRef = useRef(0);

  // Ajustamos el 'step' según el tamaño de la ventana
  let step = 1;
  if (width >= 600 && width < 1024) step = 2;  // Tablet: 2 imágenes
  if (width >= 1024) step = 3;  // Desktop: 3 imágenes

  const totalPages = Math.ceil(carouselProperties.length / step); // Páginas totales

  const pageIndex = currentSlideIndex % Math.max(totalPages, 1);

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [carouselProperties]);

  // Cambia la diapositiva siguiente
  const goToNextSlide = () => {
    if (totalPages === 0) return;
    setCurrentSlideIndex((prev) => (prev + 1) % totalPages);
    resetAutoplay();
  };

  // Cambia la diapositiva anterior
  const goToPreviusSlide = () => {
    if (totalPages === 0) return;
    setCurrentSlideIndex((prev) => (prev - 1 + totalPages) % totalPages);
    resetAutoplay();
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = touchStartX.current;
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

  const pauseAutoplayTemporarily = () => {
    pauseUntilRef.current = Date.now() + 3000;
  };

  const resetAutoplay = () => {
    pauseAutoplayTemporarily();
  };

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      if (Date.now() >= pauseUntilRef.current) {
        setCurrentSlideIndex(previous => (previous + 1) % totalPages);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [totalPages]);

  if (carouselProperties.length === 0) return null;

  return (
    <div className="carousel-container-component" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {/* Flecha izquierda */}
      {width >= 600 && (
        <button type="button" className="carousel-arrow-left" aria-label="Anterior" onClick={goToPreviusSlide}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Contenedor de imágenes */}
      <div className="carousel-image-container">
        {[...Array(step)].map((_, offset) => {
          const index = (pageIndex * step + offset) % carouselProperties.length;
          const property = carouselProperties[index];
          return (
            <img key={index} src={property.pics[0]} alt={`Propiedad ${index + 1}`} className="carousel-image"/>
          );
        })}
      </div>

      {/* Flecha derecha */}
      {width >= 600 && (
        <button type="button" className="carousel-arrow-right" aria-label="Siguiente" onClick={goToNextSlide}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Indicadores de bullets */}
      {width >= 1024 && (
        <div className="carousel-indicator-group">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span key={i} className={`carousel-indicator-dot ${i === pageIndex ? 'active' : ''}`} 
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
