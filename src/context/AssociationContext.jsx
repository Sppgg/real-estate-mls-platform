import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { GetAllAssoc } from "../services/associationData";
import { useAllAssociations } from "./AllAssociationsContext";

//creamos el contexto
const AssociationContext = createContext();

//Creamos el provider
export function AssociationProvider({ children }) {
  //id de la url
  const { id } = useParams();
  const associations = useAllAssociations();

  //almacenamos los datos que traemos de la data associationData
  const [association, setAssociation] = useState(null);

  /* Llamada más realista a la API para el futuro
    const [loading, setLoading] = useState(true); // opcional: para control de carga
    const [error, setError] = useState(null);     // opcional: para control de error

    useEffect(() => {
    const fetchAssociation = async () => {
      try {
        // Simulación de futura llamada a una API
        const data = await GetAllAssoc(); // función mock
        (eso se cambia por : 
            const res = await fetch(`/api/associations/${id}`);
            const found = await res.json();)
        const found = data.find((item) => item._id === id);

        if (!found) throw new Error("Asociación no encontrada");

        setAssociation(found);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al cargar la asociación");
      } finally {
        setLoading(false);
      }
    };

        fetchAssociation();
    }, [id]);

    if (loading) return <p>Cargando asociación...</p>;
    if (error) return <p>{error}</p>;
    */

  //Llamada de datos desde el contexto de AllAssociationcontext

  useEffect(() => {
    // const data = GetAllAssoc(); //devuelve el array de assoc
    const foundAssociation = associations.find(
      (assoc) => assoc._id.$oid === id
    );
    setAssociation(foundAssociation); //solo guarda la assoc que coincide con la URL
  }, [id, associations]);

  if (!association) return <p>Comprueba la asociación</p>;

  return (
    <AssociationContext.Provider value={association}>
      {children}
    </AssociationContext.Provider>
  );
}

//Se crea una función para evitar usar el useContext en otros componentes
export function useAssociation() {
  return useContext(AssociationContext);
}
