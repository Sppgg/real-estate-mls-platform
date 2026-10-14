import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFavorites } from "../context/FavoritesContext";
import { recordPropertyView } from "../utils/recentlyViewedStorage";
import RecentlyViewedSection from "./RecentlyViewedSection";
import PropertyLocationMiniMap from "./map/PropertyLocationMiniMap";
import "../styles/propertyDetail.css";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

export default function PropertyDetailModal({
  property,
  onClose,
  isPage = false,
  onSelectProperty,
}) {
  const { t, i18n } = useTranslation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const images = property?.pics && property.pics.length > 0 ? property.pics : [FALLBACK_IMAGE];

  // Registrar cada propiedad visualizada en sessionStorage
  useEffect(() => {
    if (property) {
      recordPropertyView(property);
    }
  }, [property]);

  // Reset del visor de fotos e inquiry al cambiar de propiedad
  useEffect(() => {
    setActiveImageIdx(0);
    setInquirySent(false);
  }, [property?._id, property?.reference]);

  const handleNextImage = useCallback(() => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Listener para cerrar con ESC y navegar con flechas
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && onClose) {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    if (!isPage) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (!isPage) {
        document.body.style.overflow = "auto";
      }
    };
  }, [onClose, handlePrevImage, handleNextImage, isPage]);

  if (!property) return null;

  const favorited = isFavorite(property);

  const currentLang = i18n.language?.startsWith("en") ? "en" : "es";
  const propertyTitle =
    property.titles?.[currentLang] ||
    property.titles?.es ||
    property.title ||
    `Propiedad ${property.reference || property._id}`;

  const descriptionText =
    property.description?.[currentLang] ||
    property.description?.es ||
    property.description?.en ||
    "Propiedad en venta en la cartera de la asociación.";

  const rawType = Array.isArray(property.type) ? property.type[0] : property.type;
  const localizedType = rawType ? t(`filter_house.types.${rawType}`) || rawType : "";

  const formattedPrice = property.price?.sale
    ? new Intl.NumberFormat(currentLang === "en" ? "en-GB" : "es-ES", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(property.price.sale)
    : t("catalog.price_on_request", "Consultar precio");

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setInquiryForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setInquirySent(false), 5000);
  };

  const fullAddress = [
    property.address?.street,
    property.address?.area || property.subarea,
    property.address?.city || property.area,
    property.address?.region,
    property.address?.country,
    property.address?.zipcode ? `CP ${property.address.zipcode}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const modalContent = (
    <div className={isPage ? "property-detail-page-inner" : "property-modal"}>
      {isPage && (
        <div className="property-page-breadcrumb">
          <button
            type="button"
            className="property-page-back-link"
            onClick={onClose}
          >
            ← {t("property_detail.back_to_catalog")}
          </button>
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            {t("catalog.ref", "Ref:")} {property.reference || property._id}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="property-modal__header">
          <h2 id="property-modal-heading" className="property-modal__header-title">
            <span>{propertyTitle}</span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <button
              type="button"
              className={`property-modal__fav-btn ${favorited ? "is-favorite" : ""}`}
              onClick={() => toggleFavorite(property)}
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
              <svg viewBox="0 0 24 24" className="property-modal__fav-icon">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{favorited ? t("favorites.in_favorites", "En favoritos") : t("favorites.add_favorite", "Añadir a favoritos")}</span>
            </button>
            <button
              type="button"
              className="property-modal__close-btn"
              onClick={onClose}
              aria-label={t("property_detail.close")}
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="property-modal__body">
          {/* Galería de imágenes */}
          <div className="property-gallery">
            <div className="property-gallery__main">
              <img
                src={images[activeImageIdx]}
                alt={`${propertyTitle} - ${activeImageIdx + 1}`}
                className="property-gallery__img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="property-gallery__nav-btn property-gallery__nav-btn--prev"
                    onClick={handlePrevImage}
                    aria-label="Anterior foto"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    className="property-gallery__nav-btn property-gallery__nav-btn--next"
                    onClick={handleNextImage}
                    aria-label="Siguiente foto"
                  >
                    &gt;
                  </button>
                </>
              )}

              <div className="property-gallery__badge">
                {activeImageIdx + 1} / {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <div className="property-gallery__thumbs">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`property-gallery__thumb ${idx === activeImageIdx ? "is-active" : ""}`}
                    onClick={() => setActiveImageIdx(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información principal */}
          <div className="property-main-info">
            <div className="property-main-info__top">
              <div className="property-main-info__title-block">
                <div className="property-main-info__tags">
                  {localizedType && (
                    <span className="property-main-info__type">{localizedType}</span>
                  )}
                  {property.new_build && (
                    <span className="property-main-info__new">
                      {t("catalog.new_build_badge")}
                    </span>
                  )}
                </div>
                <h1 className="property-main-info__title">{propertyTitle}</h1>
                {fullAddress && (
                  <div className="property-main-info__address">
                    <span>{fullAddress}</span>
                  </div>
                )}
              </div>

              <div className="property-main-info__price-block">
                <div className="property-main-info__price">{formattedPrice}</div>
                <div className="property-main-info__ref">
                  {t("property_detail.reference")}: {property.reference || property.extref || property._id}
                </div>
                {property.cadastral && (
                  <div className="property-main-info__ref">
                    {t("property_detail.cadastral")}: {property.cadastral}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ficha técnica y dimensiones */}
          <div className="property-section">
            <h3 className="property-section__title">{t("property_detail.specs_title")}</h3>
            <div className="property-specs-grid">
              {property.built && (
                <div className="property-spec-card">
                  <span className="property-spec-card__label">{t("property_detail.built_surface")}</span>
                  <span className="property-spec-card__val">{property.built} m²</span>
                </div>
              )}
              {property.plot && property.plot !== "0" && (
                <div className="property-spec-card">
                  <span className="property-spec-card__label">{t("property_detail.plot_surface")}</span>
                  <span className="property-spec-card__val">{property.plot} m²</span>
                </div>
              )}
              {property.terrace && property.terrace !== "0" && (
                <div className="property-spec-card">
                  <span className="property-spec-card__label">{t("property_detail.terrace_surface")}</span>
                  <span className="property-spec-card__val">{property.terrace} m²</span>
                </div>
              )}
              {property.beds && (
                <div className="property-spec-card">
                  <span className="property-spec-card__label">{t("property_detail.bedrooms_label")}</span>
                  <span className="property-spec-card__val">{property.beds}</span>
                </div>
              )}
              {property.baths && (
                <div className="property-spec-card">
                  <span className="property-spec-card__label">{t("property_detail.bathrooms_label")}</span>
                  <span className="property-spec-card__val">{property.baths}</span>
                </div>
              )}
              {property.toilets && (
                <div className="property-spec-card">
                  <span className="property-spec-card__label">{t("property_detail.toilets_label")}</span>
                  <span className="property-spec-card__val">{property.toilets}</span>
                </div>
              )}
              {property.year?.construction && (
                <div className="property-spec-card">
                  <span className="property-spec-card__label">{t("property_detail.year_built")}</span>
                  <span className="property-spec-card__val">{property.year.construction}</span>
                </div>
              )}
            </div>
          </div>

          {/* Calificación Energética */}
          {(property.consumoEnergia_letter || property.co2_emissions_letter) && (
            <div className="property-section">
              <h3 className="property-section__title">{t("property_detail.energy_title")}</h3>
              <div className="energy-badges">
                {property.consumoEnergia_letter && (
                  <div className="energy-badge-item">
                    <span>{t("property_detail.energy_rating")}</span>
                    <span className={`energy-letter-badge energy-letter-${property.consumoEnergia_letter}`}>
                      {property.consumoEnergia_letter}
                    </span>
                  </div>
                )}
                {property.co2_emissions_letter && (
                  <div className="energy-badge-item">
                    <span>{t("property_detail.emissions_rating")}</span>
                    <span className={`energy-letter-badge energy-letter-${property.co2_emissions_letter}`}>
                      {property.co2_emissions_letter}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Descripción */}
          <div className="property-section">
            <h3 className="property-section__title">{t("property_detail.description_title")}</h3>
            <p className="property-description-text">{descriptionText}</p>
          </div>

          {/* Equipamiento y características */}
          {property.features?.length > 0 && (
            <div className="property-section">
              <h3 className="property-section__title">{t("property_detail.features_title")}</h3>
              <ul className="property-features-list">
                {property.features.map((feature, idx) => (
                  <li key={idx} className="property-feature-item">
                    <span className="property-feature-bullet">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gastos e Impuestos */}
          {(property.community_fees || property.ibi_tax || property.garbage_tax) && (
            <div className="property-section">
              <h3 className="property-section__title">{t("property_detail.costs_title")}</h3>
              <div className="property-costs-grid">
                {property.community_fees > 0 && (
                  <div className="property-cost-item">
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {t("property_detail.community_fees")}
                    </div>
                    <strong style={{ fontSize: "1.1rem", color: "var(--color-principal)" }}>
                      {property.community_fees} € / {t("property_detail.per_year")}
                    </strong>
                  </div>
                )}
                {property.ibi_tax > 0 && (
                  <div className="property-cost-item">
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {t("property_detail.ibi")}
                    </div>
                    <strong style={{ fontSize: "1.1rem", color: "var(--color-principal)" }}>
                      {property.ibi_tax} € / {t("property_detail.per_year")}
                    </strong>
                  </div>
                )}
                {property.garbage_tax > 0 && (
                  <div className="property-cost-item">
                    <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                      {t("property_detail.garbage")}
                    </div>
                    <strong style={{ fontSize: "1.1rem", color: "var(--color-principal)" }}>
                      {property.garbage_tax} € / {t("property_detail.per_year")}
                    </strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ubicación visual de la propiedad con mapa mock y coordenadas */}
          <PropertyLocationMiniMap property={property} />

          {/* Formulario de consulta sobre la propiedad */}
          <div className="property-inquiry-box">
            <h3 className="property-inquiry-box__title">{t("property_detail.inquire_title")}</h3>
            <p className="property-inquiry-box__desc">{t("property_detail.inquire_desc")}</p>

            {inquirySent ? (
              <div className="property-inquiry-success">
                {t("property_detail.inquiry_success")}
              </div>
            ) : (
              <form className="property-inquiry-form" onSubmit={handleInquirySubmit}>
                <div>
                  <input
                    type="text"
                    required
                    placeholder={t("property_detail.inquire_name")}
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder={t("property_detail.inquire_email")}
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder={t("property_detail.inquire_phone")}
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    readOnly
                    value={`${t("property_detail.reference")}: ${property.reference || property._id}`}
                    style={{ backgroundColor: "#f0f0f0", color: "#555" }}
                  />
                </div>
                <div className="form-full">
                  <textarea
                    rows="3"
                    required
                    placeholder={t("property_detail.inquire_placeholder_msg", {
                      ref: property.reference || property._id,
                    })}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  ></textarea>
                </div>
                <div className="form-full">
                  <button type="submit" className="property-inquiry-btn">
                    {t("property_detail.send_inquiry")}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Últimas 3 propiedades vistas usando sessionStorage */}
          <RecentlyViewedSection
            currentProperty={property}
            onSelectProperty={onSelectProperty}
          />
        </div>

        {/* Footer */}
        <div className="property-modal__footer">
          <button type="button" className="property-modal__share-btn" onClick={handleShare}>
            {copiedLink ? t("property_detail.link_copied") : t("property_detail.share")}
          </button>
          <button type="button" className="filter-apply-button" onClick={onClose} style={{ padding: "0.5rem 1.5rem" }}>
            {t("property_detail.back_to_catalog")}
          </button>
        </div>
      </div>
  );

  if (isPage) {
    return (
      <div className="property-detail-page-container">
        {modalContent}
      </div>
    );
  }

  return (
    <div
      className="property-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-heading"
    >
      {modalContent}
    </div>
  );
}

