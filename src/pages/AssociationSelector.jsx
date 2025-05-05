import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllAssoc } from '../services/associationData';
import '../styles/associationSelector.css'; 

export default function AssociationSelector() {
  const navigate = useNavigate();
  const associations = GetAllAssoc();
  const [selectedId, setSelectedId] = useState('');

  const handleChange = (e) => {
    const selected = e.target.value;
    setSelectedId(selected);
    if (selected) {
      navigate(`/association/${selected}`);
    }
  };

  return (
    <div className="main-container-selector-association">
        <div className="selector-association-container">

        <h1 className="selector-title">Selecciona una asociación</h1>
        <select className="selector-dropdown" value={selectedId} onChange={handleChange}>

            <option value="">-- Elige una asociación --</option>
            {associations.map((assoc) => (
            <option key={assoc._id} value={assoc._id}>
                {assoc.name}
            </option>
            ))}

        </select>

        </div>
    </div>
  );
}