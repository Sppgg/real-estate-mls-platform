import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GetAllAssoc } from '../services/associationData';
import { useAllAssociations } from "../context/AllAssociationsContext";
import "../styles/associationSelector.css";

export default function AssociationSelector() {
  const navigate = useNavigate();
  // const associations = GetAllAssoc();
  const associations = useAllAssociations();
  const [selectedId, setSelectedId] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false); // Estado para saber si el usuario confirmó su selección

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedId(selected);
    setIsConfirmed(false); // Reseteamos la confirmación cuando se cambia la selección
  };

  const handleConfirmSelection = () => {
    if (selectedId) {
      navigate(`/association/${selectedId}`);
      setIsConfirmed(true); // Confirmamos que la selección fue realizada
    }
  };

  return (
    <div className="main-container-selector-association">
      <div className="selector-association-container">
        <h1 className="selector-title">Selecciona una asociación</h1>

        {/* Dropdown para seleccionar una asociación */}
        <select
          className="selector-dropdown"
          value={selectedId}
          onChange={handleChange}
        >
          <option value="">-- Elige una asociación --</option>
          {associations.map((assoc) => (
            <option key={assoc._id.$oid} value={assoc._id.$oid}>
              {assoc.name}
            </option>
          ))}
        </select>

        {/* Botón de confirmación para redirigir */}
        <button onClick={handleConfirmSelection} disabled={!selectedId}>
          {/* // Deshabilitamos el botón si no se ha seleccionado una opción */}
          Confirmar selección
        </button>

        {/* Mostrar un mensaje de confirmación cuando el usuario haya seleccionado una asociación */}
        {isConfirmed && <p>Has confirmado la asociación seleccionada.</p>}
      </div>
    </div>
  );
}
