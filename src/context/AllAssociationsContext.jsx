import { createContext, useContext, useState } from 'react';
import { GetAllAssoc } from '../services/associationData';

const AllAssociationsContext = createContext();

export function AllAssociationsProvider({ children }) {
  const [associations] = useState(GetAllAssoc);

  return (
    <AllAssociationsContext.Provider value={associations}>
      {children}
    </AllAssociationsContext.Provider>
  );
}

export function useAllAssociations() {
  return useContext(AllAssociationsContext);
}
