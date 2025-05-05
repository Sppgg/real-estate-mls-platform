import React from 'react';
import { AssociationProvider, useAssociation } from '../../context/AssociationContext';
import { PropertiesProvider, useProperties } from '../../context/PropertiesContext';
import HeaderComponent from '../header/HeaderComponent';

//funcion para crear el Layout
function LayoutContent(){

    //Se accede a los datos de las asociaciones a través de la funcion 
    const association = useAssociation();

    //Se accede a las propiedades solo si lo necesita el header o footer si no va en los componentes
    const propertiesByAssoc = useProperties();

  return (
    //ver si <></> o div (Si no ponemos div hay que dar estilos a App)
    <>
    <HeaderComponent/>
    {/*<Main>
      <Outlet/>
    <Main/>*/}
    {/*FOOTER*/}
    </>
  )
}

//Se crea una funcion para proveer al Layout del contexto con el provider

export default function MainLayout() {
  return (
    <AssociationProvider>
      <PropertiesProvider>
        <LayoutContent/>
      </PropertiesProvider>
    </AssociationProvider>
  )
}

