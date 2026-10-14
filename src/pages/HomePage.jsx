import { useState, useMemo } from "react";
import { useProperties } from "../context/PropertiesContext";
import PropertyFilterComponent from "../components/PropertyFilterComponent";
// import PropertyList from "../components/PropertyList";
import { useTranslation } from "react-i18next";
import { CarouselHomeComponent } from '../components/CarouselHomeComponent'

//Importar hoja de estilos de la HomePage
import '../styles/homePage.css';


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
      const matchType = filters.type ? prop.type.includes(filters.type) : true;
      const matchNewConstruction =
        !filters.newConstruction || prop.new_build === true;
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
        <CarouselHomeComponent properties={filteredProperties}/>
      </section>
      <section className="home-page-filter">
        {/* Se pasa la función setFilters para que el componente de filtro notifique los cambios */}
        <PropertyFilterComponent onFilterChange={setFilters} />
        <p role="status">{t("home.results", { count: filteredProperties.length })}</p>
        <p>{t("home.mock_catalog")}</p>
        {filteredProperties.length === 0 && <p>{t("home.no_results")}</p>}
        {/* <PropertyList properties={filteredProperties} /> */}
      </section>
      {/* Otras secciones de la Home */}
    </div>
  );
}
