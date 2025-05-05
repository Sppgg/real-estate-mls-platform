import React from 'react';
import { AssociationProvider, useAssociation } from '../../context/AssociationContext';
import { PropertiesProvider, useProperties } from '../../context/PropertiesContext';
import HeaderComponent from '../header/HeaderComponent';
import FooterComponent from "../FooterComponent";
import { Outlet } from 'react-router-dom';

//funcion para crear el Layout
function LayoutContent(){

    //Se accede a los datos de las asociaciones a través de la funcion 
    const association = useAssociation();

    //Se accede a las propiedades solo si lo necesita el header o footer si no va en los componentes
    const propertiesByAssoc = useProperties();

  return (
      <>
        <HeaderComponent />
        <main>
          <Outlet /> {/* Aquí se inyectará el contenido de la ruta anidada */}
        </main>
        <FooterComponent/>
      </>
  );
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

