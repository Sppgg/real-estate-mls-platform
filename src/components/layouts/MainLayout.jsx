import React from 'react';
import { AssociationProvider, useAssociation } from '../../context/AssociationContext';

//funcion para crear el Layout
function LayouContent(){

    //Se accede a los datos de las asociaciones a través de la funcion 
    const association = useAssociation();

  return (
    //ver si <></> o div (Si no ponemos div hay que dar estilos a App)
    <>
    {/*HEADER*/}
    {/*MAIN OUTLET*/}
    {/*FOOTER*/}
    </>
  )
}

//Se crea una funcion para proveer al Layout del contexto con el provider

export default function MainLayout() {
  return (
    <AssociationProvider>
      {/*Provider del contexto de las propiedades tendría que ir aquí para que tengan acceso */}
      <LayouContent/>
    </AssociationProvider>
  )
}

