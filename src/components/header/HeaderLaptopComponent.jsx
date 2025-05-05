import React from 'react';
import { useAssociation } from '../../context/AssociationContext';
import { Link } from 'react-router-dom';
import '../../styles/headerLaptop.css';

const HeaderLaptopComponent = () => {

  const association = useAssociation();

  if (!association) return null;

  return (
    <header className='header-laptop'>

      <div className='header-laptop-container'>
        {/*Logo de la asociación*/}
        <Link to={`/association/${association._id}`}>
          <img src={association.image} alt={association.business_name} className='header-laptop-logo-association' />
        </Link>

        {/* NavBar */}
        <nav className="nav-header-laptop">
          <ul>
            <Link to={`/association/${association._id}`}><li className="header-laptop-nav-li">Inicio</li></Link>
            <Link to="presentation"><li className="header-laptop-nav-li">Nosotros</li></Link>
            <a href="#footer"><li className="header-laptop-nav-li">Contacto</li></a> {/* o usa scroll */}
          </ul>
        </nav>

        <div className='header-language-selector'>
          <select>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        
      </div>
    </header>
  );
};

export default HeaderLaptopComponent;