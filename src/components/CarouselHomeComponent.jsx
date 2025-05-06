import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useProperties } from '../context/PropertiesContext';
import useIsMobile from '../customHook/useIsMobile';

//Estilado del carousel
import '../styles/carouselHomeComponent.css';

export const CarouselHomeComponent = () => {
  const properties = useProperties();
  const isMobile = useIsMobile();

  const [carouselProperties, setCarouselProperties] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const autoplayRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const userInteracting = useRef(false);

  

  useEffect(() => {
    if (!properties) return;

    const filtered = [...properties]
      .filter((property) => property.pics?.length > 0 && property.last_update)
      .sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
      .slice(0, 6); // AHORA 6 propiedades

    setCarouselProperties(filtered);
  }, [properties]);

  const goToNextSlide = () => {
    const step = isMobile ? 1 : 2;
    setCurrentSlideIndex((prev) => (prev + step) % carouselProperties.length);
    resetAutoplay();
  };

  const goToPreviusSlide = () => {
    const step = isMobile ? 1 : 2;
    setCurrentSlideIndex((prev) =>
      (prev - step + carouselProperties.length) % carouselProperties.length
    );
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

  const startAutoplay = () => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!userInteracting.current && carouselProperties.length > 0) {
        goToNextSlide();
      }
    }, 6000);
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
    <div
      className="carousel-container-component"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!isMobile && (
        <button className="carousel-arrow-letf" onClick={goToPreviusSlide}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div className="carousel-image-container">
        {[...Array(isMobile ? 1 : 2)].map((_, offset) => {
          const index = (currentSlideIndex + offset) % carouselProperties.length;
          const property = carouselProperties[index];
          return (
            <img
              key={index}
              src={property.pics[0]}
              alt={`Propiedad ${index + 1}`}
              className="carousel-image"
            />
          );
        })}
      </div>

      {!isMobile && (
        <button className="carousel-arrow-right" onClick={goToNextSlide}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {!isMobile && (
        <div className="carousel-indicator-group">
          {carouselProperties.map((_, i) => (
            <span
              key={i}
              className={`carousel-indicator-dot ${i === currentSlideIndex ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(i)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};