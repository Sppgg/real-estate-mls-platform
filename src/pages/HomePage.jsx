import react, { useState, useMemo } from "react";
import { useProperties } from "../context/PropertiesContext";
import PropertyFilterComponent from "../components/PropertyFilterComponent";
// import PropertyList from "../components/PropertyList";
import { useTranslation } from "react-i18next";
import { CarouselHomeComponent } from '../components/CarouselHomeComponent'

//Importar hoja de estilos de la HomePage
import '../styles/HomePage.css';


export default function HomePage() {
  const { t } = useTranslation();
  // propiedades filtradas por asociación desde el contexto
  const properties = useProperties();

  // Estado para almacenar los filtros aplicados
  const [filters, setFilters] = useState({
    type: "",
    newConstruction: false,
    area: "",
    subarea: "",
  });

  // Aplica los filtros a la lista de propiedades cuando cambien
  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    return properties.filter((prop) => {
      // Filtrado por tipo
      const matchType = filters.type ? prop.type === filters.type : true;
      // Filtrado por obra nueva (la propiedad tiene un booleano en "newConstruction")
      const matchNewConstruction =
        typeof prop.newConstruction === "boolean"
          ? filters.newConstruction
            ? prop.newConstruction === true
            : true
          : true;
      // Filtrado por área (sin diferenciar mayúsculas/minúsculas)
      const matchArea = filters.area
        ? prop.area?.toLowerCase().includes(filters.area.toLowerCase())
        : true;
      // Filtrado por subárea (sin diferenciar mayúsculas/minúsculas)
      const matchSubarea = filters.subarea
        ? prop.subarea?.toLowerCase().includes(filters.subarea.toLowerCase())
        : true;
      return matchType && matchNewConstruction && matchArea && matchSubarea;
    });
  }, [properties, filters]);

  return (
    <div className="home-page-container">
      <section className="carousel-section-home">
        <CarouselHomeComponent/>
      </section>
      <section className="home-page-filter">
        {/* Se pasa la función setFilters para que el componente de filtro notifique los cambios */}
        <PropertyFilterComponent onFilterChange={setFilters} />
        {/* <PropertyList properties={filteredProperties} /> */}
      </section>
      {/* Otras secciones de la Home */}
    </div>
  );
}
