import React, { useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProperties } from "../context/PropertiesContext";
import { useAssociation } from "../context/AssociationContext";
import { GetAllProperties } from "../services/propertiesData";
import { recordPropertyView } from "../utils/recentlyViewedStorage";
import PropertyDetailModal from "../components/PropertyDetailModal";

export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const association = useAssociation();
  const properties = useProperties();

  const property = useMemo(() => {
    if (properties && properties.length > 0) {
      const found = properties.find(
        (p) =>
          p._id === propertyId ||
          p.reference === propertyId ||
          p.extref === propertyId ||
          String(p._id).toLowerCase() === String(propertyId).toLowerCase() ||
          String(p.reference).toLowerCase() === String(propertyId).toLowerCase()
      );
      if (found) return found;
    }
    // Fallback con todas las propiedades registradas
    const all = GetAllProperties();
    return all.find(
      (p) =>
        p._id === propertyId ||
        p.reference === propertyId ||
        p.extref === propertyId ||
        String(p._id).toLowerCase() === String(propertyId).toLowerCase() ||
        String(p.reference).toLowerCase() === String(propertyId).toLowerCase()
    );
  }, [properties, propertyId]);

  // Asegura el registro en sessionStorage
  useEffect(() => {
    if (property) {
      recordPropertyView(property);
    }
  }, [property]);

  const handleClose = () => {
    if (association?._id) {
      navigate(`/association/${association._id}/properties`);
    } else {
      navigate("/");
    }
  };

  const handleSelectRecentProperty = (selected) => {
    const assocId = association?._id || "costa-del-sol";
    const targetId = selected._id || selected.reference || selected.extref;
    navigate(`/association/${assocId}/properties/${targetId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!property) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "60vh" }}>
        <h2>Propiedad no encontrada</h2>
        <p style={{ color: "#666", marginBottom: "1.5rem" }}>
          No pudimos localizar la propiedad solicitada en la cartera de esta asociación.
        </p>
        <Link
          to={`/association/${association?._id || ""}/properties`}
          className="filter-apply-button"
          style={{ textDecoration: "none", display: "inline-block" }}
        >
          {t("property_detail.back_to_catalog")}
        </Link>
      </div>
    );
  }

  return (
    <PropertyDetailModal
      property={property}
      onClose={handleClose}
      isPage={true}
      onSelectProperty={handleSelectRecentProperty}
    />
  );
}
