import { useState, useMemo, useEffect } from "react";
import { useProperties } from "../context/PropertiesContext";
import PropertyFilterComponent from "../components/PropertyFilterComponent";
import PropertyList from "../components/PropertyList";
import { CarouselHomeComponent } from "../components/CarouselHomeComponent";
import "../styles/homePage.css";

export default function HomePage({ scrollToCatalog = false }) {
  const rawProperties = useProperties();
  const properties = useMemo(() => rawProperties || [], [rawProperties]);

  // Estado unificado de los filtros
  const [filters, setFilters] = useState({
    types: [],
    locations: [],
    keyword: "",
    newConstruction: false,
    minPrice: null,
    maxPrice: null,
    minBeds: null,
    minBaths: null,
  });

  // Auto-scroll al catálogo si se solicitó por navegación directa
  useEffect(() => {
    if (scrollToCatalog || window.location.hash === "#property-catalog-section") {
      const timer = setTimeout(() => {
        const el = document.getElementById("property-catalog-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [scrollToCatalog]);

  // Función de filtrado reactiva en tiempo real
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Filtrado en tiempo real por multiselector de tipos de vivienda
      if (filters.types && filters.types.length > 0) {
        const propTypes = Array.isArray(prop.type) ? prop.type : [prop.type];
        const hasMatchingType = filters.types.some((selectedType) =>
          propTypes.includes(selectedType)
        );
        if (!hasMatchingType) return false;
      }

      // 2. Filtrado en tiempo real por multiselector de ubicaciones
      if (filters.locations && filters.locations.length > 0) {
        const propLocations = [
          prop.area,
          prop.subarea,
          prop.address?.city,
          prop.address?.area,
          prop.address?.region,
        ]
          .filter(Boolean)
          .map((loc) => String(loc).toLowerCase());

        const hasMatchingLocation = filters.locations.some((selectedLoc) =>
          propLocations.includes(String(selectedLoc).toLowerCase())
        );
        if (!hasMatchingLocation) return false;
      }

      // 3. Búsqueda libre por palabra clave (calle, zona, título, referencia)
      if (filters.keyword && filters.keyword.trim() !== "") {
        const query = filters.keyword.toLowerCase().trim();
        const searchableFields = [
          prop.address?.street,
          prop.address?.city,
          prop.address?.area,
          prop.area,
          prop.subarea,
          prop.title,
          prop.titles?.es,
          prop.titles?.en,
          prop.reference,
          prop.extref,
        ]
          .filter(Boolean)
          .map((field) => String(field).toLowerCase());

        const matchesKeyword = searchableFields.some((field) =>
          field.includes(query)
        );
        if (!matchesKeyword) return false;
      }

      // 4. Filtrado por obra nueva
      if (filters.newConstruction && !prop.new_build) {
        return false;
      }

      // 5. Filtrado por precio mínimo
      if (filters.minPrice !== null && filters.minPrice !== undefined && filters.minPrice !== "") {
        const salePrice = prop.price?.sale || 0;
        if (salePrice < Number(filters.minPrice)) return false;
      }

      // 6. Filtrado por precio máximo
      if (filters.maxPrice !== null && filters.maxPrice !== undefined && filters.maxPrice !== "") {
        const salePrice = prop.price?.sale || 0;
        if (salePrice > Number(filters.maxPrice)) return false;
      }

      // 7. Filtrado por dormitorios mínimos
      if (filters.minBeds !== null && filters.minBeds !== undefined && filters.minBeds !== "") {
        const beds = Number(prop.beds || 0);
        if (beds < Number(filters.minBeds)) return false;
      }

      // 8. Filtrado por baños mínimos
      if (filters.minBaths !== null && filters.minBaths !== undefined && filters.minBaths !== "") {
        const baths = Number(prop.baths || 0);
        if (baths < Number(filters.minBaths)) return false;
      }

      return true;
    });
  }, [properties, filters]);

  const handleResetFilters = () => {
    setFilters({
      types: [],
      locations: [],
      keyword: "",
      newConstruction: false,
      minPrice: null,
      maxPrice: null,
      minBeds: null,
      minBaths: null,
    });
  };

  return (
    <div className="home-page-container">
      {/* Carrusel de propiedades de la asociación */}
      <section className="carousel-section-home">
        <CarouselHomeComponent
          properties={filteredProperties.length > 0 ? filteredProperties : properties}
        />
      </section>

      {/* Buscador y Filtros con Multiselectores en tiempo real */}
      <section className="home-page-filter">
        <PropertyFilterComponent
          properties={properties}
          currentFilters={filters}
          onFilterChange={setFilters}
          resultsCount={filteredProperties.length}
        />
      </section>

      {/* Catálogo de propiedades actualizado en tiempo real */}
      <section className="home-catalog-section">
        <PropertyList
          properties={filteredProperties}
          onResetFilters={handleResetFilters}
        />
      </section>
    </div>
  );
}
