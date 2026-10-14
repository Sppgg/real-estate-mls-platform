import React from 'react';
import { AssociationProvider } from '../../context/AssociationContext';
import { PropertiesProvider } from '../../context/PropertiesContext';
import HeaderComponent from '../header/HeaderComponent';
import FooterComponent from "../FooterComponent";
import { Outlet } from 'react-router-dom';

//funcion para crear el Layout
function LayoutContent(){

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
