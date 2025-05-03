import React from 'react';
import { useRef, useEffect, useState } from 'react';
import useIsMobile from '../../customHook/useIsMobile';
import { useAssociation } from '../../context/AssociationContext';
//importacion del css (debo crearlo) y del componente de seleccion de idiomas
import '../../styles/headerMobile.css';


const HeaderMobileComponent = () => {

  //useState para almacenar si el menu está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);
  //useRef para detectar clics fuera de el 
  const menuRef = useRef(); 
  //isMobile para saber en que pantalla estamos y cerrar el menu 
  const isMobile = useIsMobile();
  //Traer los datos de la asociación seleccionada
  const association = useAssociation();

  //Toggle menú hamburguesa
  const toggleMenu = () =>{
    setMenuOpen(!menuOpen);
  }

  //Renderizado del menu si cambia la pantalla en la que se visualiza 
  useEffect(() => {
    //distinto a movil y el menú abierto
    if(!isMobile && menuOpen){
      setMenuOpen(false);
    }

  }, [isMobile, menuOpen]);

  //Cierre del menú cuando hace click fuera del menú
  useEffect(() => {
    //función para cerrar el menu 
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[])

  return (
    <header className='header-mobile'>

      <div className='header-mobile-container-topbar'>

        {/*Botón del menú*/}

        <button className='button-menu-mobile' onClick={toggleMenu}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="menu-icon-close">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ):(
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="menu-icon-open">
              <path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/*Logo de la asociación*/}
        <div  className='header-mobile-logo'>
          <img src={association.image} alt={association.business_name}/>
        </div>

        {/*Selector de idioma*/}
        <div>
          {/*<LenguajeSelector/>*/}
        </div>

      </div>

      {/* Menú lateral si está Open se visualiza*/}
      {menuOpen && (
        <div ref={menuRef} className="header-mobile-container-menu">
          <nav className="header-mobile-nav">
            {/* Cada ítem cierra el menú al hacer clic */}
            <li onClick={() => setMenuOpen(false)} className="header-mobile-nav-li">Inicio</li>
            <li onClick={() => setMenuOpen(false)} className="header-mobile-nav-li">Nosotros</li>
            <li onClick={() => setMenuOpen(false)} className="header-mobile-nav-li">Contacto</li>
          </nav>
        </div>
      )}
    </header>
  )
}

export default HeaderMobileComponent;