import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAssociation } from "../context/AssociationContext";
import { useFavorites } from "../context/FavoritesContext";
import { getLastThreeViewed } from "../utils/recentlyViewedStorage";
import "../styles/recentlyViewed.css";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80";

export default function RecentlyViewedSection({
  currentProperty,
  onSelectProperty,
  titleText,
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const association = useAssociation();
  const { isFavorite, toggleFavorite } = useFavorites();

  const currentPropId =
    currentProperty?._id || currentProperty?.reference || currentProperty?.extref;

  const [recentProperties, setRecentProperties] = useState(() => {
    return getLastThreeViewed(currentPropId);
  });

  const refreshRecents = useCallback(() => {
    const list = getLastThreeViewed(currentPropId);
    setRecentProperties(list);
  }, [currentPropId]);

  useEffect(() => {
    refreshRecents();

    const handleUpdate = () => {
      refreshRecents();
    };

    window.addEventListener("recently_viewed_updated", handleUpdate);
    return () => {
      window.removeEventListener("recently_viewed_updated", handleUpdate);
    };
  }, [refreshRecents, currentPropId]);

  const handleCardClick = (property) => {
    if (onSelectProperty) {
      onSelectProperty(property);
    } else {
      const assocId = association?._id || "costa-del-sol";
      const targetId = property._id || property.reference || property.extref;
      navigate(`/association/${assocId}/properties/${targetId}`);
    }
  };

  const handleExploreClick = () => {
    const assocId = association?._id || "costa-del-sol";
    navigate(`/association/${assocId}/properties`);
  };

  const currentLang = i18n.language?.startsWith("en") ? "en" : "es";

  return (
    <section
      className="recently-viewed-section"
      aria-label={t("property_detail.recently_viewed_title", "Últimas propiedades vistas")}
    >
      <div className="recently-viewed-header">
        <div className="recently-viewed-header-top">
          <div className="recently-viewed-title-wrap">
            <svg
              className="recently-viewed-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h3 className="recently-viewed-title">
              {titleText ||
                t(
                  "property_detail.recently_viewed_title",
                  "Últimas propiedades vistas"
                )}
            </h3>
          </div>
          <span className="recently-viewed-badge-session">
            {t("property_detail.recently_viewed_badge", "Esta sesión")}
          </span>
        </div>
        <p className="recently-viewed-subtitle">
          {t(
            "property_detail.recently_viewed_subtitle",
            "Consulta las últimas 3 propiedades que has visitado durante tu navegación"
          )}
        </p>
      </div>

      {recentProperties && recentProperties.length > 0 ? (
        <div className="recently-viewed-grid">
          {recentProperties.map((prop) => {
            const favorited = isFavorite(prop);
            const mainPic = prop.pics?.[0] || FALLBACK_IMAGE;

            const title =
              prop.titles?.[currentLang] ||
              prop.titles?.es ||
              prop.title ||
              `Propiedad ${prop.reference || prop._id}`;

            const rawType = Array.isArray(prop.type) ? prop.type[0] : prop.type;
            const localizedType = rawType
              ? t(`filter_house.types.${rawType}`) || rawType
              : "";

            const locationText = [
              prop.address?.city || prop.area,
              prop.address?.area || prop.subarea,
            ]
              .filter(Boolean)
              .join(", ");

            const formattedPrice = prop.price?.sale
              ? new Intl.NumberFormat(
                  currentLang === "en" ? "en-GB" : "es-ES",
                  {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }
                ).format(prop.price.sale)
              : t("catalog.price_on_request", "Consultar precio");

            return (
              <article
                key={prop._id || prop.reference}
                className="recent-card"
                onClick={() => handleCardClick(prop)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(prop);
                  }
                }}
                aria-label={`Ver ${title}`}
              >
                <div className="recent-card__img-wrap">
                  <img
                    src={mainPic}
                    alt={title}
                    className="recent-card__img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                  {localizedType && (
                    <span className="recent-card__tag">{localizedType}</span>
                  )}
                  {/* Botón de favorito con corazón rojo */}
                  <button
                    type="button"
                    className={`recent-card__fav-btn ${
                      favorited ? "is-favorite" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(prop);
                    }}
                    title={
                      favorited
                        ? t("favorites.remove_favorite", "Eliminar de favoritos")
                        : t("favorites.add_favorite", "Añadir a favoritos")
                    }
                    aria-label={
                      favorited
                        ? t("favorites.remove_favorite", "Eliminar de favoritos")
                        : t("favorites.add_favorite", "Añadir a favoritos")
                    }
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="recent-card__fav-icon"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                <div className="recent-card__content">
                  <span className="recent-card__price">{formattedPrice}</span>
                  <h4 className="recent-card__title">{title}</h4>

                  {locationText && (
                    <div className="recent-card__location">
                      <svg
                        className="recent-card__location-icon"
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
                      <span>{locationText}</span>
                    </div>
                  )}

                  <div className="recent-card__specs">
                    {prop.beds !== undefined && prop.beds !== null && (
                      <span className="recent-card__spec-item">
                        <strong>{prop.beds}</strong> {t("catalog.beds", "dorm.")}
                      </span>
                    )}
                    {prop.baths !== undefined && prop.baths !== null && (
                      <span className="recent-card__spec-item">
                        <strong>{prop.baths}</strong> {t("catalog.baths", "baños")}
                      </span>
                    )}
                    {prop.built && (
                      <span className="recent-card__spec-item">
                        <strong>{prop.built}</strong> {t("catalog.built", "m²")}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="recently-viewed-empty">
          <svg
            className="recently-viewed-empty-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <p className="recently-viewed-empty-text">
            {t(
              "property_detail.recently_viewed_empty",
              "A medida que explores el catálogo de propiedades, las últimas 3 que hayas visitado en esta sesión aparecerán aquí para que puedas compararlas fácilmente."
            )}
          </p>
          <button
            type="button"
            className="recently-viewed-empty-link"
            onClick={handleExploreClick}
          >
            {t(
              "property_detail.recently_viewed_explore",
              "Ver más propiedades del catálogo"
            )}
          </button>
        </div>
      )}
    </section>
  );
}
