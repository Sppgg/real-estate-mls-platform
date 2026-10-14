import React, { useRef, useEffect, useState } from "react";
import useIsMobile from "../../customHook/useIsMobile";
import { useAssociation } from "../../context/AssociationContext";
import { useFavorites } from "../../context/FavoritesContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguajeSelector from "../LanguageSelectorComponent";
import BrandLogo from "../BrandLogo";
import { useTranslation } from "react-i18next";
import "../../styles/headerMobile.css";

const HeaderMobileComponent = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const buttonRef = useRef();
  const isMobile = useIsMobile();
  const association = useAssociation();
  const { favoritesCount } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobile && menuOpen) {
      closeMenu();
    }
  }, [isMobile, menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!association) return null;

  const homePath = `/association/${association._id}`;

  const handlePropertiesClick = (e) => {
    e.preventDefault();
    closeMenu();
    if (location.pathname === homePath) {
      const el = document.getElementById("property-catalog-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(homePath);
      setTimeout(() => {
        const el = document.getElementById("property-catalog-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  return (
    <header className="header-mobile">
      <div className="header-mobile-container-topbar">
        {/* Botón del menú hamburguesa */}
        <button
          className="button-menu-mobile"
          ref={buttonRef}
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="menu-icon-close"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="menu-icon-open"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div className="header-mobile-logo">
          <Link to={homePath} onClick={closeMenu}>
            <BrandLogo compact />
          </Link>
        </div>

        {/* Favoritos y Selector de idioma */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Link
            to={`${homePath}/favorites`}
            className="header-mobile-fav-btn"
            aria-label={t("header.favorites", "Mis Favoritos")}
            title={t("header.favorites", "Mis Favoritos")}
            onClick={closeMenu}
          >
            <svg viewBox="0 0 24 24" className="header-mobile-fav-heart">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {favoritesCount > 0 && (
              <span className="header-mobile-fav-count">{favoritesCount}</span>
            )}
          </Link>

          <div className="header-language-selector">
            <LanguajeSelector />
          </div>
        </div>
      </div>

      {/* Menú lateral / desplegable móvil */}
      {menuOpen && (
        <div ref={menuRef} className="header-mobile-container-menu">
          <nav className="header-mobile-nav">
            <ul>
              <Link to={homePath} onClick={closeMenu}>
                <li className="header-mobile-nav-li">{t("header.home")}</li>
              </Link>
              <a href="#property-catalog-section" onClick={handlePropertiesClick}>
                <li className="header-mobile-nav-li">{t("header.properties")}</li>
              </a>
              <Link to={`${homePath}/presentation`} onClick={closeMenu}>
                <li className="header-mobile-nav-li">{t("header.about")}</li>
              </Link>
              <Link to={`${homePath}/contact`} onClick={closeMenu}>
                <li className="header-mobile-nav-li">{t("header.contact")}</li>
              </Link>
              {/* Mis favoritos al final de la lista del header */}
              <Link to={`${homePath}/favorites`} onClick={closeMenu}>
                <li className="header-mobile-nav-li header-mobile-fav-item">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                    <svg style={{ width: "18px", height: "18px", fill: "#dc2626" }} viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {t("header.favorites", "Mis Favoritos")}
                    {favoritesCount > 0 && (
                      <span className="header-nav-fav-badge">{favoritesCount}</span>
                    )}
                  </span>
                </li>
              </Link>
              <li style={{ paddingTop: "1rem" }}>
                <Link
                  to="/"
                  onClick={closeMenu}
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#f0f4f5",
                    borderRadius: "4px",
                    fontSize: "0.95rem",
                    color: "var(--color-principal)",
                    fontWeight: "600",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  {t("header.switch_association")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderMobileComponent;
