import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/propertyfilterstyle.css";

// Array de tipos de vivienda
const types = [
  { type: "Adosado" },
  { type: "Almacén" },
  { type: "Amarre" },
  { type: "Apartahotel" },
  { type: "Apartamento" },
  { type: "Apartamento en Planta Baja" },
  { type: "Apartamento en Última Planta" },
  { type: "Barco" },
  { type: "Bungalow" },
  { type: "Casa" },
  { type: "Casa de Madera" },
  { type: "Chalet" },
  { type: "Complejo de Apartamentos" },
  { type: "Dúplex" },
  { type: "Edificio" },
  { type: "Estudio" },
  { type: "Estudio en Planta Baja" },
  { type: "Estudio en Última Planta" },
  { type: "Finca" },
  { type: "Finca - Cortijo" },
  { type: "Finca con Ruinas" },
  { type: "Garaje" },
  { type: "Granja" },
  { type: "Hostal" },
  { type: "Hotel" },
  { type: "Local Comercial" },
  { type: "Nave Industrial" },
  { type: "Negocio" },
  { type: "Otros" },
  { type: "Palacio" },
  { type: "Parcela" },
  { type: "Parcela Comercial" },
  { type: "Parcela Industrial" },
  { type: "Parcela Residencial" },
  { type: "Parcela Rústica" },
  { type: "Parcela para Golf" },
  { type: "Terreno Urbanizable" },
  { type: "Trastero" },
  { type: "Villa Aislada" },
  { type: "Villa Pareada" },
  { type: "Ático" },
  { type: "Ático Dúplex" },
];

const PropertyFilterComponent = ({ onFilterChange }) => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState("");
  const [newConstruction, setNewConstruction] = useState(false);
  const [area, setArea] = useState("");
  const [subarea, setSubarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        type: selectedType,
        newConstruction,
        area,
        subarea,
      });
    }
  };

  return (
    <form className="property-filter" onSubmit={handleSubmit}>
      <h2 className="filter-title">{t("filter_house.title")}</h2>

      {/* Campo: Tipo de vivienda */}
      <div className="filter-field filter-type">
        <label htmlFor="house-type">{t("filter_house.type")}</label>
        <select
          id="house-type"
          name="house-type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">{t("filter_house.select_type")}</option>
          {types.map((item, index) => (
            <option key={index} value={item.type}>
              {t(`filter_house.types.${item.type}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Campo: Obra nueva */}
      <div className="filter-field filter-new-construction">
        <label htmlFor="newConstruction">
          <input
            type="checkbox"
            id="newConstruction"
            checked={newConstruction}
            onChange={(e) => setNewConstruction(e.target.checked)}
          />
          {t("filter_house.new_construction")}
        </label>
      </div>

      {/* Campo: Área */}
      <div className="filter-field filter-area">
        <label htmlFor="area">{t("filter_house.area")}</label>
        <input
          type="text"
          id="area"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder={t("filter_house.area_placeholder")}
        />
      </div>

      {/* Campo: Subárea */}
      <div className="filter-field filter-subarea">
        <label htmlFor="subarea">{t("filter_house.subarea")}</label>
        <input
          type="text"
          id="subarea"
          name="subarea"
          value={subarea}
          onChange={(e) => setSubarea(e.target.value)}
          placeholder={t("filter_house.subarea_placeholder")}
        />
      </div>

      <div className="filter-field filter-button">
        <button type="submit" className="filter-apply-button">
          {t("filter_house.apply")}
        </button>
      </div>
    </form>
  );
};

export default PropertyFilterComponent;
