import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFavorites } from "../context/FavoritesContext";
import { useAssociation } from "../context/AssociationContext";
import { GetAllProperties } from "../services/propertiesData";
import PropertyCard from "../components/PropertyCard";
import PropertyDetailModal from "../components/PropertyDetailModal";
import "../styles/favoritesPage.css";

export default function FavoritesPage() {
  const { t } = useTranslation();
  const association = useAssociation();
  const { favorites, clearFavorites } = useFavorites();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const homePath = association?._id ? `/association/${association._id}` : "/";
  const catalogPath = `${homePath}/properties`;

  // Obtener todas las propiedades de la base de datos que están en favoritos
  const favoriteProperties = useMemo(() => {
    if (!favorites || favorites.length === 0) return [];
    const all = GetAllProperties();
    return all.filter(
      (p) => favorites.includes(p._id) || favorites.includes(p.reference) || favorites.includes(p.extref)
    );
  }, [favorites]);

  const handleClear = () => {
    if (window.confirm(t("favorites.clear_confirm", "¿Estás seguro de que deseas vaciar tu lista de favoritos?"))) {
      clearFavorites();
    }
  };

  return (
    <div className="favorites-page-container">
      {/* Hero Header */}
      <section className="favorites-hero">
        <div className="favorites-hero__inner">
          <div className="favorites-hero__badge">
            <svg
              className="favorites-hero__heart-icon"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            <span>{t("favorites.badge", "Favoritos")}</span>
          </div>
          <h1 className="favorites-hero__title">
            {t("favorites.title", "Mis Favoritos")}
          </h1>
          <p className="favorites-hero__desc">
            {t(
              "favorites.subtitle",
              "Tu selección personal de propiedades guardadas para consultar cuando quieras."
            )}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <main className="favorites-content">
        {favoriteProperties.length > 0 ? (
          <>
            {/* Barra de control y conteo */}
            <div className="favorites-action-bar">
              <div className="favorites-count-label">
                <span>
                  {favoriteProperties.length === 1
                    ? t("favorites.count_one", "1 propiedad guardada")
                    : t("favorites.count_other", "{{count}} propiedades guardadas", {
                        count: favoriteProperties.length,
                      })}
                </span>
                <strong>{favoriteProperties.length}</strong>
              </div>

              <div className="favorites-actions-right">
                <button
                  type="button"
                  className="favorites-btn-clear"
                  onClick={handleClear}
                >
                  {t("favorites.clear_all", "Vaciar lista")}
                </button>
                <Link to={catalogPath} className="favorites-btn-explore">
                  <span>+ {t("favorites.explore_catalog", "Explorar más")}</span>
                </Link>
              </div>
            </div>

            {/* Listado de propiedades favoritas en Cards */}
            <div className="favorites-grid">
              {favoriteProperties.map((prop) => (
                <PropertyCard
                  key={prop._id || prop.reference}
                  property={prop}
                  onSelect={(p) => setSelectedProperty(p)}
                />
              ))}
            </div>
          </>
        ) : (
          /* Estado vacío si no hay favoritos */
          <div className="favorites-empty-box">
            <div className="favorites-empty-icon-wrap">
              <svg
                viewBox="0 0 24 24"
                className="favorites-empty-heart"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
            <h2 className="favorites-empty-title">
              {t("favorites.empty_title", "Aún no tienes propiedades en favoritos")}
            </h2>
            <p className="favorites-empty-desc">
              {t(
                "favorites.empty_desc",
                "Haz clic en el corazón rojo de cualquier propiedad del catálogo para guardarla en tu lista personal y consultarla más tarde."
              )}
            </p>
            <Link to={catalogPath} className="favorites-empty-cta">
              <svg
                style={{ width: "18px", height: "18px", fill: "currentColor" }}
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span>{t("favorites.explore_catalog", "Explorar catálogo de propiedades")}</span>
            </Link>
          </div>
        )}
      </main>

      {/* Modal completo si el usuario clica en una tarjeta */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
        />
      )}
    </div>
  );
}
