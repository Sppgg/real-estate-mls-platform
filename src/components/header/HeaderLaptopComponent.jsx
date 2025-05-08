import React from "react";
import { useAssociation } from "../../context/AssociationContext";
import { Link } from "react-router-dom";
import LanguajeSelector from "../LanguageSelectorComponent";
import "../../styles/headerLaptop.css";
import { useTranslation } from "react-i18next";

const HeaderLaptopComponent = () => {
  //useTranslation para la traducción de los textos
  const { t } = useTranslation();
  //Traer los datos de la asociación seleccionada
  const association = useAssociation();

  if (!association) return null;

  return (
    <header className="header-laptop">
      <div className="header-laptop-container">
        {/*Logo de la asociación*/}
        <Link to={`/association/${association._id}`}>
          <img src={association.image} alt={association.business_name} className='header-laptop-logo-association' />
        </Link>

        {/* NavBar */}
        <nav className="nav-header-laptop">
          <ul>
            <Link to={`/association/${association._id}`}>
              <li className="header-laptop-nav-li">{t("header.home")}</li>
            </Link>
            <Link to="presentation">
              <li className="header-laptop-nav-li">{t("header.about")}</li>
            </Link>
            <Link to="#footer">
              <li className="header-laptop-nav-li"> {t("header.contact")}</li>
            </Link>
          </ul>
        </nav>

        {/*Selector de idioma*/}
        <div className="header-language-selector">
          <LanguajeSelector />
        </div>
        
      </div>
    </header>
  );
};

export default HeaderLaptopComponent;
