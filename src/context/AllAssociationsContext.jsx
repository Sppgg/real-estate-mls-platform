import { createContext, useContext, useState, useEffect } from 'react';
import { GetAllAssoc } from '../services/associationData';

const AllAssociationsContext = createContext();

export function AllAssociationsProvider({ children }) {
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    const data = GetAllAssoc(); // simulación de fetch
    setAssociations(data);
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