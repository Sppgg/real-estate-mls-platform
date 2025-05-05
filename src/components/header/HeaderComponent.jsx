import React from 'react';
import HeaderLaptopComponent from './HeaderLaptopComponent';
import HeaderMobileComponent from './HeaderMobileComponent';
import useIsMobile from '../../customHook/useIsMobile';

function HeaderComponent() {

  //Se usa el Hook personalizado
  const isMobile = useIsMobile();

  return (
    <>
    {/* Si isMobile es true (window.innerWidth <= 768) se muestra el header para movil, si es false se muestra el header de pantallas mayores a 768 */}
      {isMobile ? (
        <HeaderMobileComponent className="header-mobile" />
      ) : (
        <HeaderLaptopComponent className="header-laptop" />
      )}
    </>
  )
}

export default HeaderComponent;