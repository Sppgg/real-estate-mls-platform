import React from 'react';
import { useAssociation } from '../../context/AssociationContext';
import { Link } from 'react-router-dom';

import '../../styles/headerLaptop.css';


const HeaderLaptopComponent = () => {

  //Traer los datos de la asociación seleccionada
  const association = useAssociation();

  return (
    <header className='header-laptop'>

      <div className='header-laptop-container'>

        {/*Logo de la asociación*/}
        <Link to="/association/:id"><img src={association.image} alt={association.business_name} className='header-laptop-logo-association'/></Link>

        {/* TODO NavBar Laptop*/}
        <nav className="nav-header-laptop">
          <ul>
            <Link to="/association/:id"><li className="header-laptop-nav-li">Inicio</li></Link>
            <Link to="presentation"><li className="header-laptop-nav-li">Nosotros</li></Link>
            <Link to="#footer"><li className="header-laptop-nav-li">Contacto</li></Link>
          </ul>
        </nav>

        {/*Selector de idioma TODO*/}
        <div className='header-language-selector'>
          <select>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
          {/*<LanguajeSelector/>*/}
        </div>

      </div>

    </header>
  )
}

export default HeaderLaptopComponent;