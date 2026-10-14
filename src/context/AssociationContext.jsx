import { createContext, useMemo, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GetAllAssoc } from '../services/associationData';

const AssociationContext = createContext();

export function AssociationProvider({ children }) {
  const { id } = useParams();
  const association = useMemo(() => GetAllAssoc().find(item => item._id === id), [id]);

  if (!association) {
    return <p>Asociación no encontrada. <Link to="/">Seleccionar una asociación</Link></p>;
  }

  return (
    <AssociationContext.Provider value={association}>
      {children}
    </AssociationContext.Provider>
  );
}

export function useAssociation() {
  return useContext(AssociationContext);
}
