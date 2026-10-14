import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PropertyCard from "./PropertyCard";
import PropertyDetailModal from "./PropertyDetailModal";
import PropertyMapDiscovery from "./map/PropertyMapDiscovery";
import "../styles/propertyList.css";

const ITEMS_PER_PAGE = 9;

export default function PropertyList({ properties = [], onResetFilters }) {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "map"

  // Ordenación de propiedades
  const sortedProperties = useMemo(() => {
    const list = [...properties];
    if (sortBy === "price_asc") {
      return list.sort((a, b) => (a.price?.sale || 0) - (b.price?.sale || 0));
    }
    if (sortBy === "price_desc") {
      return list.sort((a, b) => (b.price?.sale || 0) - (a.price?.sale || 0));
    }
    if (sortBy === "built_desc") {
      return list.sort((a, b) => Number(b.built || 0) - Number(a.built || 0));
    }
    // "recent": por last_update descendente
    return list.sort(
      (a, b) => new Date(b.last_update || 0) - new Date(a.last_update || 0)
    );
  }, [properties, sortBy]);

  // Paginación
  const totalPages = Math.ceil(sortedProperties.length / ITEMS_PER_PAGE) || 1;
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProperties, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to catalog top
    const catalogElement = document.getElementById("property-catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="property-catalog-section" className="property-catalog-container">
      {/* Barra de cabecera del catálogo */}
      <div className="catalog-header-bar">
        <div className="catalog-header-info">
          <h2 className="catalog-title">{t("catalog.section_title")}</h2>
          <span className="catalog-subtitle">
            {t("home.results", { count: sortedProperties.length })}
          </span>
        </div>

        {sortedProperties.length > 0 && (
          <div className="catalog-controls">
            {/* Selector de modo de vista: Cuadrícula / Mapa */}
            <div className="catalog-view-switcher" role="group" aria-label="Modo de vista">
              <button
                type="button"
                className={`catalog-view-btn ${viewMode === "grid" ? "is-active" : ""}`}
                onClick={() => setViewMode("grid")}
                title={t("catalog.view_grid", "Cuadrícula")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                <span>{t("catalog.view_grid", "Cuadrícula")}</span>
              </button>
              <button
                type="button"
                className={`catalog-view-btn ${viewMode === "map" ? "is-active" : ""}`}
                onClick={() => setViewMode("map")}
                title={t("catalog.view_map", "Mapa interactivo")}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                <span>{t("catalog.view_map", "Mapa")}</span>
              </button>
            </div>

            <label htmlFor="catalog-sort" style={{ fontSize: "0.88rem", fontWeight: 600 }}>
              {t("catalog.sort_by")}
            </label>
            <select
              id="catalog-sort"
              className="catalog-sort-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="recent">{t("catalog.sort_recent")}</option>
              <option value="price_asc">{t("catalog.sort_price_asc")}</option>
              <option value="price_desc">{t("catalog.sort_price_desc")}</option>
              <option value="built_desc">{t("catalog.sort_built_desc")}</option>
            </select>
          </div>
        )}
      </div>

      {/* Contenido según el modo de vista seleccionado */}
      {sortedProperties.length === 0 ? (
        <div className="catalog-empty-state">
          <h3 className="catalog-empty-title">{t("home.no_results")}</h3>
          <p className="catalog-empty-desc">{t("home.no_results_help")}</p>
          {onResetFilters && (
            <button
              type="button"
              className="filter-apply-button"
              onClick={onResetFilters}
            >
              {t("filter_house.reset")}
            </button>
          )}
        </div>
      ) : viewMode === "map" ? (
        /* Vista de Mapa interactivo para discovery */
        <PropertyMapDiscovery
          properties={sortedProperties}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
        />
      ) : (
        /* Vista estándar en cuadrícula de tarjetas */
        <div className="property-cards-grid">
          {paginatedProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onSelect={(prop) => setSelectedProperty(prop)}
            />
          ))}
        </div>
      )}

      {/* Paginación solo en vista cuadrícula */}
      {viewMode === "grid" && totalPages > 1 && (
        <div className="catalog-pagination">
          <button
            type="button"
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Página anterior"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            // Show only surrounding pages if many pages
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={`pagination-btn ${pageNumber === currentPage ? "is-active" : ""}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            }
            if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <span key={pageNumber} className="pagination-ellipsis">
                  ...
                </span>
              );
            }
            return null;
          })}

          <button
            type="button"
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Página siguiente"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal con la vista completa de la propiedad */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
        />
      )}
    </section>
  );
}
