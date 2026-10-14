import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllAssoc } from "../services/associationData";
import { GetAllProperties } from "../services/propertiesData";
import BrandLogo from "../components/BrandLogo";
import "../styles/associationSelector.css";

export default function AssociationSelector() {
  const navigate = useNavigate();
  const associations = GetAllAssoc();
  const allProperties = GetAllProperties();
  const [selectedId, setSelectedId] = useState("");

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedId(selected);
  };

  const handleConfirmSelection = (id) => {
    const targetId = id || selectedId;
    if (targetId) {
      navigate(`/association/${targetId}`);
    }
  };

  // Conteo de propiedades por asociación
  const getPropCount = (assocId) => {
    return allProperties.filter(
      (p) => p.partner_id === assocId && p.active && !p.public_view_disabled
    ).length;
  };

  return (
    <div className="main-container-selector-association">
      <BrandLogo />
      <div className="selector-association-container">
        <h1 className="selector-title">Selecciona una Asociación Inmobiliaria</h1>
        <p className="selector-subtitle">
          Elige la red inmobiliaria colegiada para consultar su catálogo unificado de propiedades
        </p>

        {/* Tarjetas interactivas de asociaciones */}
        <div className="selector-associations-grid">
          {associations.map((assoc) => {
            const count = getPropCount(assoc._id);
            const isSelected = selectedId === assoc._id;
            return (
              <div
                key={assoc._id}
                className={`selector-card-item ${isSelected ? "is-selected" : ""}`}
                onClick={() => {
                  setSelectedId(assoc._id);
                  handleConfirmSelection(assoc._id);
                }}
              >
                <div className="selector-card-logo-wrap">
                  <img
                    src={assoc.image}
                    alt={assoc.name}
                    className="selector-card-logo"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <h2 className="selector-card-name">{assoc.name}</h2>
                <p className="selector-card-bio">{assoc.bio}</p>
                <span className="selector-card-badge">
                  {count} propiedades disponibles
                </span>
              </div>
            );
          })}
        </div>

        {/* Dropdown alternativo y botón de confirmación */}
        <div className="selector-controls-row">
          <select
            className="selector-dropdown"
            value={selectedId}
            onChange={handleChange}
            aria-label="Seleccionar asociación"
          >
            <option value="">-- O selecciona desde la lista --</option>
            {associations.map((assoc) => (
              <option key={assoc._id} value={assoc._id}>
                {assoc.name} ({getPropCount(assoc._id)} propiedades)
              </option>
            ))}
          </select>

          <button
            type="button"
            className="selector-confirm-btn"
            onClick={() => handleConfirmSelection()}
            disabled={!selectedId}
          >
            Entrar al portal
          </button>
        </div>
      </div>
    </div>
  );
}
