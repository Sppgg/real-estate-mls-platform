import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAssociation } from "../context/AssociationContext";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/propertyCard.css";

// Fallback image in case external demo image fails to load
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80";

export default function PropertyCard({ property, onSelect, layout = "grid" }) {
  const { t, i18n } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const association = useAssociation();

  if (!property) return null;

  const favorited = isFavorite(property);

  // Formato de precio en euros
  const formattedPrice = property.price?.sale
    ? new Intl.NumberFormat(i18n.language === "en" ? "en-GB" : "es-ES", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(property.price.sale)
    : t("catalog.price_on_request", "Consultar precio");

  // Título localizado
  const currentLang = i18n.language?.startsWith("en") ? "en" : "es";
  const propertyTitle =
    property.titles?.[currentLang] ||
    property.titles?.es ||
    property.title ||
    `Propiedad ${property.reference || property._id}`;

  // Tipo de propiedad
  const rawType = Array.isArray(property.type) ? property.type[0] : property.type;
  const localizedType = rawType ? t(`filter_house.types.${rawType}`) || rawType : "";

  // Ubicación resumida
  const locationText = [
    property.address?.city || property.area,
    property.address?.area || property.subarea,
  ]
    .filter(Boolean)
    .join(", ");

  const mainPic = property.pics?.[0] || FALLBACK_IMAGE;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(property);
    } else {
      const assocId = association?._id || "costa-del-sol";
      const targetId = property._id || property.reference || property.extref;
      navigate(`/association/${assocId}/properties/${targetId}`);
    }
  };

  return (
    <article
      className={`property-card ${layout === "list" ? "property-card--list" : ""}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`Ver detalles de ${propertyTitle}`}
    >
      {/* Imagen principal y Badges */}
      <div className="property-card__image-wrapper">
        <img
          src={mainPic}
          alt={propertyTitle}
          className="property-card__image"
          loading="lazy"
          onError={handleImageError}
        />

        <div className="property-card__badge-bar">
          {localizedType && (
            <span className="property-card__type-badge">{localizedType}</span>
          )}
          {property.new_build && (
            <span className="property-card__new-badge">
              {t("catalog.new_build_badge")}
            </span>
          )}
        </div>

        {/* Botón de favorito con corazón rojo */}
        <button
          type="button"
          className={`property-card__fav-btn ${favorited ? "is-favorite" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleFavorite(property);
          }}
          aria-label={
            favorited
              ? t("favorites.remove_favorite", "Eliminar de favoritos")
              : t("favorites.add_favorite", "Añadir a favoritos")
          }
          title={
            favorited
              ? t("favorites.remove_favorite", "Eliminar de favoritos")
              : t("favorites.add_favorite", "Añadir a favoritos")
          }
        >
          <svg
            viewBox="0 0 24 24"
            className="property-card__fav-icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {property.pics?.length > 1 && (
          <div className="property-card__photo-count">
            <span>{property.pics.length} fotos</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="property-card__content">
        <div className="property-card__price-row">
          <span className="property-card__price">{formattedPrice}</span>
          {property.extref && (
            <span className="property-card__ref">{property.extref}</span>
          )}
        </div>

        <h3 className="property-card__title" title={propertyTitle}>
          {propertyTitle}
        </h3>

        {locationText && (
          <div className="property-card__location">
            <span>{locationText}</span>
          </div>
        )}

        {/* Ficha rápida de especificaciones limpia y sin emojis */}
        <div className="property-card__specs">
          {property.beds && (
            <div className="property-card__spec-item">
              <span>{property.beds} {t("catalog.beds")}</span>
            </div>
          )}

          {property.baths && (
            <div className="property-card__spec-item">
              <span>{property.baths} {t("catalog.baths")}</span>
            </div>
          )}

          {property.built && (
            <div className="property-card__spec-item">
              <span>{property.built} m²</span>
            </div>
          )}

          {property.plot && property.plot !== "0" && (
            <div className="property-card__spec-item">
              <span>{property.plot} m² parcela</span>
            </div>
          )}
        </div>

        {/* Mini etiquetas de equipamiento */}
        {property.features?.length > 0 && (
          <div className="property-card__features">
            {property.features.slice(0, 3).map((feat, idx) => (
              <span key={idx} className="property-card__feature-chip">
                {feat}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="property-card__feature-chip">
                +{property.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Botón de acción */}
        <div className="property-card__footer">
          <button
            type="button"
            className="property-card__action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(property);
            }}
          >
            <span>{t("catalog.view_details")}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
