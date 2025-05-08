import { createContext, useContext, useState, useEffect } from "react";
// import { GetAllAssoc } from '../services/associationData';
import { fetchWithToken } from "../services/apiService";

const AllAssociationsContext = createContext();

export function AllAssociationsProvider({ children }) {
  const [associations, setAssociations] = useState([]);
  const ASSOCIATION_PATH = import.meta.env.VITE_API_ASSOCIATIONS;

  // useEffect de la data mockeada
  // useEffect(() => {
  //   const data = GetAllAssoc(); // simulación de fetch
  //   setAssociations(data);
  // }, []);
  useEffect(() => {
    const fetchAssociations = async () => {
      try {
        const data = await fetchWithToken(ASSOCIATION_PATH);
        if (data.success && Array.isArray(data.companies)) {
          setAssociations(data.companies);
        }
      } catch (error) {
        console.error("Error fetching association", error);
      }
    };
    fetchAssociations();
  }, []);

  return (
    <AllAssociationsContext.Provider value={associations}>
      {children}
    </AllAssociationsContext.Provider>
  );
}

export function useAllAssociations() {
  return useContext(AllAssociationsContext);
}
