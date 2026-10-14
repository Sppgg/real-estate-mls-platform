import { createContext, useMemo, useContext } from 'react';
import { useAssociation } from './AssociationContext';
import { GetAllProperties } from '../services/propertiesData';

const PropertiesContext = createContext();

export function PropertiesProvider({ children }) {
  const association = useAssociation();
  const propertiesByAssoc = useMemo(() => GetAllProperties().filter(item =>
    item.partner_id === association?._id && item.active && !item.public_view_disabled
  ), [association]);

  return (
    <PropertiesContext.Provider value={propertiesByAssoc}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  return useContext(PropertiesContext);
}
