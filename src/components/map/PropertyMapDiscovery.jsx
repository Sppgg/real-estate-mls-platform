import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "../../context/FavoritesContext";
import "../../styles/propertyMap.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80";

// Coordenadas base de referencia para la Costa del Sol
const DEFAULT_BOUNDS = {
  minLat: 36.42,
  maxLat: 36.65,
  minLng: -5.15,
  maxLng: -4.45,
};

export default function PropertyMapDiscovery({
  properties = [],
  onSelectProperty,
}) {
  const { t, i18n } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedPinProperty, setSelectedPinProperty] = useState(null);
  const [activeAreaFilter, setActiveAreaFilter] = useState("all");

  const canvasRef = useRef(null);

  // Extraer áreas únicas para chips de filtro rápido
  const availableAreas = useMemo(() => {
    const set = new Set();
    properties.forEach((p) => {
      const city = p.address?.city || p.area;
      if (city && city.trim() !== "") {
        set.add(city.trim());
      }
    });
    return Array.from(set).slice(0, 6);
  }, [properties]);

  // Filtrado por chip de área si está activo
  const visibleProperties = useMemo(() => {
    if (activeAreaFilter === "all") return properties;
    return properties.filter((p) => {
      const city = String(p.address?.city || p.area || "").toLowerCase();
      return city.includes(activeAreaFilter.toLowerCase());
    });
  }, [properties, activeAreaFilter]);

  // Cálculo del Bounding Box dinámico según las propiedades mostradas
  const bounds = useMemo(() => {
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;

    visibleProperties.forEach((p) => {
      const lat = parseFloat(p.map?.lat);
      const lng = parseFloat(p.map?.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
      }
    });

    if (minLat === Infinity || minLat === maxLat) {
      return DEFAULT_BOUNDS;
    }

    // Añadir margen del 10% alrededor de las coordenadas
    const latMargin = Math.max((maxLat - minLat) * 0.12, 0.03);
    const lngMargin = Math.max((maxLng - minLng) * 0.12, 0.05);

    return {
      minLat: minLat - latMargin,
      maxLat: maxLat + latMargin,
      minLng: minLng - lngMargin,
      maxLng: maxLng + lngMargin,
    };
  }, [visibleProperties]);

  // Proyección de coordenadas GPS (lat, lng) a porcentajes de posición (left, top)
  const pinPositions = useMemo(() => {
    const latSpan = bounds.maxLat - bounds.minLat || 1;
    const lngSpan = bounds.maxLng - bounds.minLng || 1;

    return visibleProperties.map((prop, idx) => {
      let lat = parseFloat(prop.map?.lat);
      let lng = parseFloat(prop.map?.lng);

      // Si no tiene coordenadas válidas, generar posición determinista razonable
      if (isNaN(lat) || isNaN(lng)) {
        const hash = (prop._id || prop.reference || String(idx))
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        lat = bounds.minLat + (hash % 100) * 0.01 * latSpan;
        lng = bounds.minLng + ((hash * 7) % 100) * 0.01 * lngSpan;
      }

      // En el hemisferio norte, mayor latitud está arriba (menor top)
      const topPct = Math.max(
        6,
        Math.min(90, ((bounds.maxLat - lat) / latSpan) * 100)
      );
      // Longitud: mayor longitud (hacia el este) está a la derecha
      const leftPct = Math.max(
        6,
        Math.min(94, ((lng - bounds.minLng) / lngSpan) * 100)
      );

      return {
        property: prop,
        top: topPct,
        left: leftPct,
        lat,
        lng,
      };
    });
  }, [visibleProperties, bounds]);

  // Manejo de zoom
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.35, 0.8);
      if (next <= 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedPinProperty(null);
    setActiveAreaFilter("all");
  };

  // Manejo de drag / pan
  const handleMouseDown = (e) => {
    if (e.target.closest(".mock-property-pin") || e.target.closest(".map-popup-card")) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  const currentLang = i18n.language?.startsWith("en") ? "en" : "es";

  return (
    <div className="property-map-discovery" aria-label={t("map.section_title", "Mapa de propiedades")}>
      {/* Barra de herramientas superior */}
      <div className="map-discovery-toolbar">
        <div className="map-toolbar-info">
          <span className="map-toolbar-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              {t("map.properties_located", {
                count: visibleProperties.length,
                defaultValue: `${visibleProperties.length} propiedades en el mapa`,
              })}
            </span>
          </span>
        </div>

        {/* Chips de filtro rápido por zona geográfica */}
        {availableAreas.length > 0 && (
          <div className="map-area-chips">
            <button
              type="button"
              className={`map-area-chip ${activeAreaFilter === "all" ? "is-active" : ""}`}
              onClick={() => setActiveAreaFilter("all")}
            >
              {t("map.all_areas", "Todas las zonas")}
            </button>
            {availableAreas.map((area) => (
              <button
                key={area}
                type="button"
                className={`map-area-chip ${
                  activeAreaFilter.toLowerCase() === area.toLowerCase() ? "is-active" : ""
                }`}
                onClick={() => setActiveAreaFilter(area)}
              >
                {area}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Escenario del Mapa interactivo */}
      <div
        className="map-discovery-stage"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
      >
        <div
          className="mock-map-canvas"
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${
              panOffset.y / zoomLevel
            }px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Fondo vectorial cartográfico con costa, carreteras y cuadrícula */}
          <svg
            className="mock-map-svg"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="coastSea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dbeafe" />
                <stop offset="50%" stopColor="#bfdbfe" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
              <linearGradient id="mountainTerrain" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>
              <pattern id="cartoGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(148, 163, 184, 0.18)" strokeWidth="0.8" />
              </pattern>
            </defs>

            {/* Tierra / relieve base */}
            <rect width="1000" height="460" fill="url(#mountainTerrain)" />
            <rect width="1000" height="460" fill="url(#cartoGrid)" />

            {/* Zonas de montaña / sierras (ej. Sierra Blanca, Mijas) */}
            <path
              d="M 50 20 Q 150 0 250 40 Q 380 10 500 50 Q 650 20 800 60 Q 920 10 980 40 L 980 0 L 50 0 Z"
              fill="rgba(226, 232, 240, 0.7)"
            />

            {/* Parques, campos de golf y zonas arboladas */}
            <path
              d="M 120 100 Q 220 80 280 140 Q 230 210 140 180 Z"
              fill="rgba(187, 247, 208, 0.45)"
            />
            <path
              d="M 450 120 Q 560 90 620 150 Q 580 230 460 210 Z"
              fill="rgba(187, 247, 208, 0.45)"
            />
            <path
              d="M 750 140 Q 860 110 930 170 Q 880 250 780 230 Z"
              fill="rgba(187, 247, 208, 0.45)"
            />

            {/* Autopista AP-7 (peaje norte) */}
            <path
              d="M 0 160 C 250 130, 500 170, 750 140 C 880 125, 950 145, 1000 140"
              stroke="#cbd5e1"
              strokeWidth="9"
              fill="none"
            />
            <path
              d="M 0 160 C 250 130, 500 170, 750 140 C 880 125, 950 145, 1000 140"
              stroke="#ffffff"
              strokeWidth="5"
              fill="none"
            />

            {/* Autovía A-7 / N-340 litoral */}
            <path
              d="M 0 350 C 250 330, 500 370, 750 340 C 880 325, 950 345, 1000 340"
              stroke="#94a3b8"
              strokeWidth="11"
              fill="none"
            />
            <path
              d="M 0 350 C 250 330, 500 370, 750 340 C 880 325, 950 345, 1000 340"
              stroke="#fbbf24"
              strokeWidth="6"
              fill="none"
            />

            {/* Vías transversales hacia la costa */}
            <path d="M 200 150 L 220 350" stroke="#ffffff" strokeWidth="4" />
            <path d="M 400 165 L 430 365" stroke="#ffffff" strokeWidth="4" />
            <path d="M 600 155 L 610 355" stroke="#ffffff" strokeWidth="4" />
            <path d="M 820 145 L 840 345" stroke="#ffffff" strokeWidth="4" />

            {/* Línea de costa y Mar Mediterráneo */}
            <path
              d="M 0 440 C 220 420, 480 460, 720 435 C 860 420, 940 445, 1000 435 L 1000 600 L 0 600 Z"
              fill="url(#coastSea)"
            />
            <path
              d="M 0 440 C 220 420, 480 460, 720 435 C 860 420, 940 445, 1000 435"
              stroke="#60a5fa"
              strokeWidth="3.5"
              fill="none"
            />

            {/* Olas decorativas en el mar */}
            <path d="M 150 510 Q 180 500 210 510" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
            <path d="M 450 530 Q 480 520 510 530" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />
            <path d="M 750 510 Q 780 500 810 510" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" />

            {/* Rótulos cartográficos */}
            <text x="820" y="555" fill="#2563eb" fontSize="15" fontWeight="700" opacity="0.65" letterSpacing="2">
              MAR MEDITERRÁNEO
            </text>
            <text x="35" y="150" fill="#94a3b8" fontSize="11" fontWeight="700" letterSpacing="1">
              AP-7
            </text>
            <text x="35" y="342" fill="#d97706" fontSize="11" fontWeight="700" letterSpacing="1">
              A-7 COSTA
            </text>
          </svg>

          {/* Marcadores de propiedades colocados según sus coordenadas */}
          <div className="map-pins-container">
            {pinPositions.map(({ property, top, left }) => {
              const favorited = isFavorite(property);
              const isSelected =
                selectedPinProperty?._id === property._id ||
                selectedPinProperty?.reference === property.reference;

              const priceText = property.price?.sale
                ? `${Math.round(property.price.sale / 1000)}k €`
                : "Consultar";

              return (
                <div
                  key={property._id || property.reference}
                  className={`mock-property-pin ${favorited ? "is-favorite" : ""} ${
                    isSelected ? "is-active" : ""
                  }`}
                  style={{ top: `${top}%`, left: `${left}%` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPinProperty(property);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Propiedad en ${property.address?.city || property.area}: ${priceText}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPinProperty(property);
                    }
                  }}
                >
                  <div className="pin-price-pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span>{priceText}</span>
                  </div>
                  <div className="pin-pointer-tip"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brújula de orientación */}
        <div className="map-compass-badge" title="Orientación Norte">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 19 21 12 17 5 21 12 2" />
          </svg>
          <span>N · 36°30'</span>
        </div>

        {/* Controles de Zoom flotantes */}
        <div className="map-floating-controls">
          <button
            type="button"
            className="map-control-btn"
            onClick={handleZoomIn}
            title={t("map.zoom_in", "Acercar")}
            aria-label="Acercar mapa"
          >
            +
          </button>
          <button
            type="button"
            className="map-control-btn"
            onClick={handleZoomOut}
            title={t("map.zoom_out", "Alejar")}
            aria-label="Alejar mapa"
          >
            −
          </button>
          <button
            type="button"
            className="map-control-btn"
            onClick={handleResetView}
            title={t("map.reset_view", "Restablecer vista")}
            aria-label="Restablecer vista del mapa"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>

        {/* Tarjeta flotante emergente cuando se selecciona un pin */}
        {selectedPinProperty && (
          <div className="map-popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="map-popup-img-wrap">
              <img
                src={selectedPinProperty.pics?.[0] || FALLBACK_IMAGE}
                alt={selectedPinProperty.title || "Propiedad"}
                className="map-popup-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
              <button
                type="button"
                className="map-popup-close-btn"
                onClick={() => setSelectedPinProperty(null)}
                aria-label={t("property_detail.close", "Cerrar")}
              >
                ×
              </button>
              <button
                type="button"
                className={`map-popup-fav-btn ${
                  isFavorite(selectedPinProperty) ? "is-favorite" : ""
                }`}
                onClick={() => toggleFavorite(selectedPinProperty)}
                title={
                  isFavorite(selectedPinProperty)
                    ? t("favorites.remove_favorite", "Eliminar de favoritos")
                    : t("favorites.add_favorite", "Añadir a favoritos")
                }
              >
                <svg viewBox="0 0 24 24" className="map-popup-fav-icon">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>

            <div className="map-popup-body">
              <div className="map-popup-price">
                {selectedPinProperty.price?.sale
                  ? new Intl.NumberFormat(
                      currentLang === "en" ? "en-GB" : "es-ES",
                      {
                        style: "currency",
                        currency: "EUR",
                        maximumFractionDigits: 0,
                      }
                    ).format(selectedPinProperty.price.sale)
                  : t("catalog.price_on_request", "Consultar precio")}
              </div>

              <h4 className="map-popup-title">
                {selectedPinProperty.titles?.[currentLang] ||
                  selectedPinProperty.titles?.es ||
                  selectedPinProperty.title ||
                  `Propiedad ${selectedPinProperty.reference || selectedPinProperty._id}`}
              </h4>

              <div className="map-popup-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {[
                    selectedPinProperty.address?.city || selectedPinProperty.area,
                    selectedPinProperty.address?.area || selectedPinProperty.subarea,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </div>

              <div className="map-popup-specs">
                {selectedPinProperty.beds && (
                  <span>
                    <strong>{selectedPinProperty.beds}</strong> {t("catalog.beds", "dorm.")}
                  </span>
                )}
                {selectedPinProperty.baths && (
                  <span>
                    <strong>{selectedPinProperty.baths}</strong> {t("catalog.baths", "baños")}
                  </span>
                )}
                {selectedPinProperty.built && (
                  <span>
                    <strong>{selectedPinProperty.built}</strong> {t("catalog.built", "m²")}
                  </span>
                )}
              </div>

              <div className="map-popup-actions">
                <button
                  type="button"
                  className="map-popup-view-btn"
                  onClick={() => {
                    if (onSelectProperty) {
                      onSelectProperty(selectedPinProperty);
                    }
                  }}
                >
                  {t("catalog.view_details", "Ver propiedad")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
