import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/multiSelector.css";

export default function MultiLocationSelector({
  availableLocations = [],
  selectedLocations = [],
  onChange,
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleLocation = (loc) => {
    if (selectedLocations.includes(loc)) {
      onChange(selectedLocations.filter((l) => l !== loc));
    } else {
      onChange([...selectedLocations, loc]);
    }
  };

  const handleSelectAll = () => {
    onChange([...availableLocations]);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const filteredLocations = availableLocations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ubicaciones destacadas para pills rápidos (hasta 6)
  const popularLocations = availableLocations.slice(0, 6);

  return (
    <div className="multiselector-container" ref={containerRef}>
      {/* Botón trigger */}
      <div
        className={`multiselector-trigger ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="multiselector-value-summary">
          {selectedLocations.length === 0 ? (
            <span className="multiselector-placeholder">
              {t("filter_house.select_locations", "Seleccionar ubicaciones...")}
            </span>
          ) : selectedLocations.length <= 2 ? (
            selectedLocations.map((loc) => (
              <span key={loc} className="multiselector-chip">
                {loc}
                <button
                  type="button"
                  className="multiselector-chip-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleLocation(loc);
                  }}
                  aria-label={`Quitar ${loc}`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <>
              <span className="multiselector-chip">{selectedLocations[0]}</span>
              <span className="multiselector-count-badge">
                +{selectedLocations.length - 1} {t("multiselector.selected", { count: selectedLocations.length })}
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

      {/* Menú desplegable */}
      {isOpen && (
        <div className="multiselector-dropdown" role="listbox">
          <div className="multiselector-search-box">
            <input
              type="text"
              className="multiselector-search-input"
              placeholder={t("filter_house.search_locations", "Buscar ubicación...")}
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
            {filteredLocations.map((loc) => {
              const isSelected = selectedLocations.includes(loc);
              return (
                <li
                  key={loc}
                  className={`multiselector-item ${isSelected ? "is-selected" : ""}`}
                  onClick={() => handleToggleLocation(loc)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    aria-hidden="true"
                  />
                  <span>{loc}</span>
                </li>
              );
            })}
            {filteredLocations.length === 0 && (
              <li className="multiselector-item" style={{ color: "var(--color-text-muted)" }}>
                {t("filter_house.no_locations_found", "No se encontraron ubicaciones")}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Pills rápidos de ubicaciones */}
      {popularLocations.length > 0 && (
        <div className="quick-types-row">
          {popularLocations.map((loc) => {
            const isActive = selectedLocations.includes(loc);
            return (
              <button
                key={loc}
                type="button"
                className={`quick-type-pill ${isActive ? "is-active" : ""}`}
                onClick={() => handleToggleLocation(loc)}
              >
                {loc}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
