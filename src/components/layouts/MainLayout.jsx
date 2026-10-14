import React, { useEffect } from 'react';
import { AssociationProvider } from '../../context/AssociationContext';
import { PropertiesProvider } from '../../context/PropertiesContext';
import HeaderComponent from '../header/HeaderComponent';
import FooterComponent from "../FooterComponent";
import { Outlet, useLocation } from 'react-router-dom';

// Componente para restaurar la posición de scroll al cambiar de página
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

// Función para renderizar el Layout
function LayoutContent() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </>
  );
}

// Proveedor de contextos para la asociación y sus propiedades
export default function MainLayout() {
  return (
    <AssociationProvider>
      <PropertiesProvider>
        <LayoutContent />
      </PropertiesProvider>
    </AssociationProvider>
  );
}
