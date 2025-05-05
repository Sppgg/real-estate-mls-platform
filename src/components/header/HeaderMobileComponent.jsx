import React from 'react';
import { useRef, useEffect, useState } from 'react';
import useIsMobile from '../../customHook/useIsMobile';
import { useAssociation } from '../../context/AssociationContext';
import { Link } from 'react-router-dom';

//importacion del css (debo crearlo) y del componente de seleccion de idiomas
import '../../styles/headerMobile.css';


const HeaderMobileComponent = () => {

  //useState para almacenar si el menu está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);
  //useRef para detectar clics fuera de el 
  const menuRef = useRef(); 
  //useRef para detectar clics en el botón
  const buttonRef = useRef();
  //isMobile para saber en que pantalla estamos y cerrar el menu 
  const isMobile = useIsMobile();
  //Traer los datos de la asociación seleccionada
  const association = useAssociation();

  if (!association) return null; // Evita renderizar si aún no hay datos

  //Toggle menú hamburguesa
  const toggleMenu = () =>{
    setMenuOpen(!menuOpen);
  }

  //Función para cerrar el menú
  const closeMenu = () => {
    setMenuOpen(false);
  }

  //Cierra el menú si cambia a modo escritorio
  useEffect(() => {
    if(!isMobile && menuOpen){
      closeMenu();
    }

  }, [isMobile, menuOpen]);

  //Cierre del menú cuando hace click fuera del menú
  useEffect(() => {
    //función para cerrar el menu 
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) 
        && buttonRef.current && !buttonRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[])

  
  return (
    <header className='header-mobile'>

      <div className='header-mobile-container-topbar'>

        {/*Botón del menú*/}

        <button className='button-menu-mobile' ref={buttonRef} onClick={toggleMenu}>
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
          <Link to={`/association/${association._id}`}><img src={association.image} alt={association.business_name}/></Link>
        </div>

        {/*Selector de idioma TODO*/}
        <div className='header-language-selector'>
          <select>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
          {/*<LanguajeSelector/>*/}
        </div>

      </div>

      {/* Menú lateral si está Open se visualiza*/}
      {menuOpen && (
        <div ref={menuRef} className="header-mobile-container-menu">
          <nav className="header-mobile-nav">
            <ul>
              {/* Cada ítem cierra el menú al hacer clic */}
              <Link to={`/association/${association._id}`}><li onClick={closeMenu} className="header-mobile-nav-li">Inicio</li></Link>
              <Link to="presentation"><li onClick={closeMenu} className="header-mobile-nav-li">Nosotros</li></Link>
              <Link to="#footer" ><li onClick={closeMenu} className="header-mobile-nav-li">Contacto</li></Link> {/*Tengo que mirar esto TODO*/}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

export default HeaderMobileComponent;