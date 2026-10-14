import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/multiSelector.css";

const ALL_PROPERTY_TYPES = [
  "Adosado", "Almacén", "Amarre", "Apartahotel", "Apartamento",
  "Apartamento en Planta Baja", "Apartamento en Última Planta", "Barco",
  "Bungalow", "Casa", "Casa de Madera", "Chalet", "Complejo de Apartamentos",
  "Dúplex", "Edificio", "Estudio", "Estudio en Planta Baja", "Estudio en Última Planta",
  "Finca", "Finca - Cortijo", "Finca con Ruinas", "Garaje", "Granja", "Hostal",
  "Hotel", "Local Comercial", "Nave Industrial", "Negocio", "Otros", "Palacio",
  "Parcela", "Parcela Comercial", "Parcela Industrial", "Parcela Residencial",
  "Parcela Rústica", "Parcela para Golf", "Terreno Urbanizable", "Trastero",
  "Villa Aislada", "Villa Pareada", "Ático", "Ático Dúplex"
];

// Most frequent types for quick access pills
const POPULAR_TYPES = [
  "Apartamento", "Chalet", "Ático", "Dúplex", "Casa", "Villa Aislada", "Estudio", "Adosado"
];

export default function MultiTypeSelector({ selectedTypes = [], onChange }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleType = (type) => {
    if (selectedTypes.includes(type)) {
      onChange(selectedTypes.filter((t) => t !== type));
    } else {
      onChange([...selectedTypes, type]);
    }
  };

  const handleSelectAll = () => {
    onChange([...ALL_PROPERTY_TYPES]);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const filteredTypes = ALL_PROPERTY_TYPES.filter((type) => {
    const localized = t(`filter_house.types.${type}`) || type;
    return (
      type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      localized.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="multiselector-container" ref={containerRef}>
      {/* Trigger Button */}
      <div
        className={`multiselector-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="multiselector-value-summary">
          {selectedTypes.length === 0 ? (
            <span className="multiselector-placeholder">
              {t("multiselector.placeholder")}
            </span>
          ) : selectedTypes.length <= 2 ? (
            selectedTypes.map((type) => (
              <span key={type} className="multiselector-chip">
                {t(`filter_house.types.${type}`)}
                <button
                  type="button"
                  className="multiselector-chip-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleType(type);
                  }}
                  aria-label={`Quitar ${type}`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <>
              <span className="multiselector-chip">
                {t(`filter_house.types.${selectedTypes[0]}`)}
              </span>
              <span className="multiselector-count-badge">
                +{selectedTypes.length - 1} {t("multiselector.selected", { count: selectedTypes.length })}
              </span>
            </>
          )}
        </div>

        <span className="multiselector-chevron" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="multiselector-dropdown" role="listbox">
          <div className="multiselector-search-box">
            <input
              type="text"
              className="multiselector-search-input"
              placeholder={t("multiselector.search_types")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>

          <div className="multiselector-actions">
            <button
              type="button"
              className="multiselector-action-btn"
              onClick={handleSelectAll}
            >
              {t("multiselector.select_all")}
            </button>
            <button
              type="button"
              className="multiselector-action-btn"
              onClick={handleClearAll}
            >
              {t("multiselector.clear_all")}
            </button>
          </div>

          <ul className="multiselector-list">
            {filteredTypes.map((type) => {
              const isSelected = selectedTypes.includes(type);
              return (
                <li
                  key={type}
                  className={`multiselector-item ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleToggleType(type)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    aria-hidden="true"
                  />
                  <span>{t(`filter_house.types.${type}`)}</span>
                </li>
              );
            })}
            {filteredTypes.length === 0 && (
              <li className="multiselector-item" style={{ color: "var(--color-text-muted)" }}>
                No se encontraron tipos
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Quick pills */}
      <div className="quick-types-row">
        {POPULAR_TYPES.map((type) => {
          const isActive = selectedTypes.includes(type);
          return (
            <button
              key={type}
              type="button"
              className={`quick-type-pill ${isActive ? "is-active" : ""}`}
              onClick={() => handleToggleType(type)}
            >
              {t(`filter_house.types.${type}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export { ALL_PROPERTY_TYPES };
