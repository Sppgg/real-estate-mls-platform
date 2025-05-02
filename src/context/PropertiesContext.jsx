import { createContext, useState, useEffect, useContext } from "react";
import { useAssociation } from "./AssociationContext";
import { GetAllProperties } from "../services/propertiesData";

//creamos el contexto 
const PropertiesContext = createContext();

//Creamos el provider 
export function PropertiesProvider({children}) {
    
    //Se usa el contexto de assosiation
    const association = useAssociation();
    //Se guardan los datos de las propiedades según la Asociación
    const [propertiesByAssoc, setPropertiesByAssoc] = useState(null); //No se si es mejor inicializarlo en null o []

    //llamada fake para traer los datos y mostrar las propiedades solo de la propiedad
    useEffect(() => {
        if(!association) return;
        
        const properties = GetAllProperties(); //devuelve el array de properties
        const foundPropertiesByAssoc = properties.filter((item) => item.partner_id === association._id);
        setPropertiesByAssoc(foundPropertiesByAssoc);//guarda las propiedades filtradas segun la asociacion

    }, [association]);

    //Se puede hacer aquí la lógica de los filtros
    
    return (
        <PropertiesContext.Provider value={propertiesByAssoc}>
            {children}
        </PropertiesContext.Provider>
    )
}

//Se crea una función para evitar usar el useContext en otros componentes
export function useProperties(){
    return useContext(PropertiesContext);
}