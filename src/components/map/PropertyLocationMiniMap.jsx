import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/propertyMap.css";

export default function PropertyLocationMiniMap({ property }) {
  const { t } = useTranslation();
  const [copiedCoords, setCopiedCoords] = useState(false);

  if (!property) return null;

  // Extraer coordenadas con fallbacks realistas en caso de ausencia
  const lat = property.map?.lat ? parseFloat(property.map.lat) : 36.5097;
  const lng = property.map?.lng ? parseFloat(property.map.lng) : -4.8858;

  const formattedCoords = `${lat.toFixed(5)}° N, ${Math.abs(lng).toFixed(5)}° W`;

  // Construir dirección formateada
  const fullAddress = [
    property.address?.street,
    property.address?.area || property.subarea,
    property.address?.city || property.area,
    property.address?.region,
    property.address?.zipcode ? `CP ${property.address.zipcode}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${lat}, ${lng}`).then(() => {
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2000);
    });
  };

  return (
    <div className="property-section property-location-section">
      <h3 className="property-section__title">
        {t("property_detail.location_title", "Ubicación")}
      </h3>

      <div className="property-location-card">
        {/* Barra con dirección y coordenadas GPS */}
        <div className="property-location-info-bar">
          <div className="location-address-wrap">
            <svg
              className="location-address-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div>
              <p className="location-address-text">
                {fullAddress || t("property_detail.location_reserved", "Zona residencial exclusiva")}
              </p>
              <p className="location-address-sub">
                {property.address?.city || property.area || "Costa del Sol"},{" "}
                {property.address?.region || "Málaga"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="location-gps-badge"
            onClick={handleCopyCoords}
            title={t("map.click_to_copy_coords", "Haz clic para copiar coordenadas")}
          >
            <span>{formattedCoords}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {copiedCoords ? (
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mini mapa visual mock de la zona */}
        <div className="property-mini-map" aria-label="Visualización de ubicación en el mapa">
          <svg
            className="mini-map-svg"
            viewBox="0 0 800 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="miniSeaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dbeafe" />
                <stop offset="100%" stopColor="#bfdbfe" />
              </linearGradient>
              <pattern id="miniGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Terreno / Tierra */}
            <rect width="800" height="240" fill="#f8fafc" />
            <rect width="800" height="240" fill="url(#miniGrid)" />

            {/* Zonas verdes / Golf / Parques */}
            <path
              d="M 50 40 Q 140 20 220 70 Q 280 120 180 160 Q 90 170 50 110 Z"
              fill="rgba(187, 247, 208, 0.45)"
            />
            <path
              d="M 520 30 Q 640 10 720 50 Q 770 110 680 140 Q 580 150 530 90 Z"
              fill="rgba(187, 247, 208, 0.45)"
            />

            {/* Carreteras principales */}
            <path
              d="M 0 130 C 250 110, 500 150, 800 130"
              stroke="#cbd5e1"
              strokeWidth="10"
              fill="none"
            />
            <path
              d="M 0 130 C 250 110, 500 150, 800 130"
              stroke="#ffffff"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M 400 0 C 410 100, 390 180, 400 240"
              stroke="#e2e8f0"
              strokeWidth="6"
              fill="none"
            />

            {/* Calles residenciales secundarias */}
            <path d="M 200 60 L 350 160" stroke="#f1f5f9" strokeWidth="3" />
            <path d="M 450 140 L 600 80" stroke="#f1f5f9" strokeWidth="3" />
            <path d="M 280 180 L 520 190" stroke="#f1f5f9" strokeWidth="3" />

            {/* Franja de Costa y Mar Mediterráneo */}
            <path
              d="M 0 230 C 200 225, 450 245, 800 230 L 800 320 L 0 320 Z"
              fill="url(#miniSeaGrad)"
            />
            <path
              d="M 0 230 C 200 225, 450 245, 800 230"
              stroke="#93c5fd"
              strokeWidth="3"
              fill="none"
            />

            {/* Rótulo de Costa */}
            <text x="680" y="285" fill="#3b82f6" fontSize="13" fontWeight="600" opacity="0.6">
              Mar Mediterráneo
            </text>
            <text x="30" y="30" fill="#64748b" fontSize="12" fontWeight="600" opacity="0.7">
              {property.address?.city || property.area || "Zona Residencial"}
            </text>
          </svg>

          {/* Marcador central con radar de aproximación */}
          <div className="mini-map-center-pin">
            <div className="mini-map-radar-ring"></div>
            <div className="mini-map-marker-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="mini-map-marker-label">
              {t("map.approx_location", "Ubicación aproximada")}
            </span>
          </div>
        </div>

        {/* Puntos de interés cercanos con distancias estimadas */}
        <div className="property-nearby-places">
          <div className="nearby-place-item">
            <div className="nearby-place-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              </svg>
            </div>
            <div>
              <span className="nearby-place-name">{t("map.poi_beach", "Playa")}</span>
              <span className="nearby-place-dist">~ 850 m (10 min a pie)</span>
            </div>
          </div>

          <div className="nearby-place-item">
            <div className="nearby-place-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
            </div>
            <div>
              <span className="nearby-place-name">{t("map.poi_golf", "Club de Golf")}</span>
              <span className="nearby-place-dist">~ 2.1 km (4 min en coche)</span>
            </div>
          </div>

          <div className="nearby-place-item">
            <div className="nearby-place-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <div>
              <span className="nearby-place-name">{t("map.poi_services", "Supermercados")}</span>
              <span className="nearby-place-dist">~ 400 m (5 min a pie)</span>
            </div>
          </div>

          <div className="nearby-place-item">
            <div className="nearby-place-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <span className="nearby-place-name">{t("map.poi_airport", "Aeropuerto AGP")}</span>
              <span className="nearby-place-dist">~ 35 km (30 min)</span>
            </div>
          </div>
        </div>

        {/* Footer con nota de privacidad y enlace para abrir en Google Maps */}
        <div className="property-location-footer">
          <p className="location-privacy-note">
            {t(
              "map.privacy_note",
              "Por motivos de privacidad y seguridad, el mapa muestra el área aproximada de la propiedad."
            )}
          </p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="external-map-link"
          >
            <span>{t("map.open_in_google_maps", "Abrir en Google Maps")}</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
