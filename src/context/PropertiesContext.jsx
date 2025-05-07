import { createContext, useState, useEffect, useContext } from "react";
import { useAssociation } from "./AssociationContext";
// import { GetAllProperties } from "../services/propertiesData";
import { fetchWithToken } from "../services/apiService";

//creamos el contexto
const PropertiesContext = createContext();

//Creamos el provider
export function PropertiesProvider({ children }) {
  //Se usa el contexto de assosiation
  const association = useAssociation();
  const PROPERTIES_PATH = import.meta.env.VITE_API_PROPERTIES;

  //Se guardan los datos de las propiedades según la Asociación
  const [properties, setProperties] = useState([]); //No se si es mejor inicializarlo en null o []
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //llamada a la API para traer los datos y mostrar las propiedades
  useEffect(() => {
    if (!association?._id) return;
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWithToken(PROPERTIES_PATH);
        if (data.success && Array.isArray(data.properties)) {
          setProperties(data.properties);
        } else {
          setError("No properties found", error);
        }
      } catch (error) {
        console.error("Error loading properties", error);
        setError("Error loading properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();

    // // const properties = GetAllProperties(); //devuelve el array de properties
    // const foundPropertiesByAssoc = associations.filter(
    //   (properties) => properties.partner_id === association._id
    // );
    // setPropertiesByAssoc(foundPropertiesByAssoc); //guarda las propiedades filtradas segun la asociacion
  }, [association]);

  //Se puede hacer aquí la lógica de los filtros

  return (
    <PropertiesContext.Provider value={propertiesByAssoc}>
      {children}
    </PropertiesContext.Provider>
  );
}

//Se crea una función para evitar usar el useContext en otros componentes
export function useProperties() {
  return useContext(PropertiesContext);
}
