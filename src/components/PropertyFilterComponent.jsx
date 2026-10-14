import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import MultiTypeSelector from "./MultiTypeSelector";
import MultiLocationSelector from "./MultiLocationSelector";
import "../styles/propertyfilterstyle.css";

const PropertyFilterComponent = ({
  properties = [],
  currentFilters = {},
  onFilterChange,
  resultsCount,
}) => {
  const { t } = useTranslation();
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extraer ubicaciones únicas disponibles en las propiedades de esta asociación
  const availableLocations = useMemo(() => {
    const locSet = new Set();
    properties.forEach((p) => {
      if (p.address?.city) locSet.add(p.address.city);
      if (p.address?.area) locSet.add(p.address.area);
      if (p.area) locSet.add(p.area);
      if (p.subarea) locSet.add(p.subarea);
    });
    return Array.from(locSet).filter(Boolean).sort();
  }, [properties]);

  // Función para propagar los cambios de filtros en tiempo real
  const handleFilterUpdate = (key, value) => {
    if (onFilterChange) {
      onFilterChange((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleReset = () => {
    if (onFilterChange) {
      onFilterChange({
        types: [],
        locations: [],
        keyword: "",
        newConstruction: false,
        minPrice: null,
        maxPrice: null,
        minBeds: null,
        minBaths: null,
      });
    }
  };

  const hasActiveFilters =
    (currentFilters.types && currentFilters.types.length > 0) ||
    (currentFilters.locations && currentFilters.locations.length > 0) ||
    currentFilters.keyword ||
    currentFilters.newConstruction ||
    currentFilters.minPrice ||
    currentFilters.maxPrice ||
    currentFilters.minBeds ||
    currentFilters.minBaths;

  return (
    <div className="property-filter">
      {/* Cabecera del filtro */}
      <div className="filter-header-row">
        <div>
          <h2 className="filter-title">{t("filter_house.title")}</h2>
          <p className="filter-subtitle">{t("filter_house.subtitle")}</p>
        </div>

        <div className="filter-header-actions">
          {typeof resultsCount === "number" && (
            <span className="filter-live-count">
              {resultsCount} {t("catalog.section_title").toLowerCase()}
            </span>
          )}
          {hasActiveFilters && (
            <button
              type="button"
              className="filter-reset-btn"
              onClick={handleReset}
            >
              {t("filter_house.reset")}
            </button>
          )}
        </div>
      </div>

      {/* Multiselectores en paralelo: Tipos de vivienda y Ubicaciones */}
      <div className="filter-multiselect-row">
        {/* Multiselector de Tipos */}
        <div className="filter-field">
          <label>{t("filter_house.type")}</label>
          <MultiTypeSelector
            selectedTypes={currentFilters.types || []}
            onChange={(types) => handleFilterUpdate("types", types)}
          />
        </div>

        {/* Multiselector de Ubicaciones */}
        <div className="filter-field">
          <label>{t("filter_house.area")}</label>
          <MultiLocationSelector
            availableLocations={availableLocations}
            selectedLocations={currentFilters.locations || []}
            onChange={(locations) => handleFilterUpdate("locations", locations)}
          />
        </div>
      </div>

      {/* Búsqueda por texto y Obra nueva en tiempo real */}
      <div className="filter-primary-grid">
        <div className="filter-field">
          <input
            type="text"
            id="filter-keyword"
            name="keyword"
            value={currentFilters.keyword || ""}
            onChange={(e) => handleFilterUpdate("keyword", e.target.value)}
            placeholder="Buscar por calle, zona o palabra clave..."
            aria-label="Buscar por calle, zona o palabra clave"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="newConstruction" className="checkbox-label">
            <input
              type="checkbox"
              id="newConstruction"
              checked={currentFilters.newConstruction || false}
              onChange={(e) => handleFilterUpdate("newConstruction", e.target.checked)}
            />
            <span>{t("filter_house.new_construction")}</span>
          </label>
        </div>
      </div>

      {/* Toggle filtros avanzados */}
      <div className="filter-advanced-toggle-row">
        <button
          type="button"
          className="filter-advanced-toggle-btn"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? t("filter_house.less_filters") : t("filter_house.more_filters")}
        </button>
      </div>

      {showAdvanced && (
        <div className="filter-advanced-grid">
          <div className="filter-field">
            <label htmlFor="minPrice">{t("filter_house.price_min")}</label>
            <input
              type="number"
              id="minPrice"
              value={currentFilters.minPrice || ""}
              onChange={(e) =>
                handleFilterUpdate("minPrice", e.target.value ? Number(e.target.value) : null)
              }
              placeholder="150000"
              min="0"
              step="10000"
            />
          </div>

          <div className="filter-field">
            <label htmlFor="maxPrice">{t("filter_house.price_max")}</label>
            <input
              type="number"
              id="maxPrice"
              value={currentFilters.maxPrice || ""}
              onChange={(e) =>
                handleFilterUpdate("maxPrice", e.target.value ? Number(e.target.value) : null)
              }
              placeholder="800000"
              min="0"
              step="10000"
            />
          </div>

          <div className="filter-field">
            <label htmlFor="minBeds">{t("filter_house.bedrooms")}</label>
            <select
              id="minBeds"
              value={currentFilters.minBeds || ""}
              onChange={(e) =>
                handleFilterUpdate("minBeds", e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">{t("filter_house.any")}</option>
              <option value="1">1+ {t("catalog.beds")}</option>
              <option value="2">2+ {t("catalog.beds")}</option>
              <option value="3">3+ {t("catalog.beds")}</option>
              <option value="4">4+ {t("catalog.beds")}</option>
              <option value="5">5+ {t("catalog.beds")}</option>
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="minBaths">{t("filter_house.bathrooms")}</label>
            <select
              id="minBaths"
              value={currentFilters.minBaths || ""}
              onChange={(e) =>
                handleFilterUpdate("minBaths", e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">{t("filter_house.any")}</option>
              <option value="1">1+ {t("catalog.baths")}</option>
              <option value="2">2+ {t("catalog.baths")}</option>
              <option value="3">3+ {t("catalog.baths")}</option>
              <option value="4">4+ {t("catalog.baths")}</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilterComponent;
