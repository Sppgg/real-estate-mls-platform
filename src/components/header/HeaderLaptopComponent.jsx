import React, { useState, useRef, useEffect } from "react";
import { useAssociation } from "../../context/AssociationContext";
import { useFavorites } from "../../context/FavoritesContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguajeSelector from "../LanguageSelectorComponent";
import BrandLogo from "../BrandLogo";
import "../../styles/headerLaptop.css";
import { useTranslation } from "react-i18next";

const HeaderLaptopComponent = () => {
  const { t } = useTranslation();
  const association = useAssociation();
  const { favoritesCount } = useFavorites();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isTablet, setIsTablet] = useState(
    typeof window !== "undefined" && window.innerWidth <= 1024
  );
  const menuDrawerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const tablet = window.innerWidth <= 1024;
      setIsTablet(tablet);
      if (!tablet && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        menuOpen &&
        menuDrawerRef.current &&
        !menuDrawerRef.current.contains(e.target) &&
        !e.target.closest(".header-laptop-hamburger-btn")
      ) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  if (!association) return null;

  const currentPath = location.pathname;
  const homePath = `/association/${association._id}`;

  const handlePropertiesClick = (e) => {
    e.preventDefault();
    if (menuOpen) setMenuOpen(false);
    if (currentPath === homePath) {
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
    <header className="header-laptop">
      <div className="header-laptop-container">
        <Link to={homePath} onClick={() => setMenuOpen(false)}>
          <BrandLogo />
        </Link>

        {/* Barra de navegación principal: Mis Favoritos al FINAL de la lista */}
        <nav className="nav-header-laptop">
          <ul>
            <Link to={homePath}>
              <li
                className={`header-laptop-nav-li ${
                  currentPath === homePath ? "is-active" : ""
                }`}
              >
                {t("header.home")}
              </li>
            </Link>
            <a href="#property-catalog-section" onClick={handlePropertiesClick}>
              <li className="header-laptop-nav-li">{t("header.properties")}</li>
            </a>
            <Link to={`${homePath}/presentation`}>
              <li
                className={`header-laptop-nav-li ${
                  currentPath.includes("/presentation") || currentPath.includes("/about")
                    ? "is-active"
                    : ""
                }`}
              >
                {t("header.about")}
              </li>
            </Link>
            <Link to={`${homePath}/contact`}>
              <li
                className={`header-laptop-nav-li ${
                  currentPath.includes("/contact") ? "is-active" : ""
                }`}
              >
                {t("header.contact")}
              </li>
            </Link>
            {/* Opción Mis Favoritos al final de la lista del header */}
            <Link to={`${homePath}/favorites`}>
              <li
                className={`header-laptop-nav-li header-laptop-nav-fav ${
                  currentPath.includes("/favorites") || currentPath.includes("/favoritos")
                    ? "is-active"
                    : ""
                }`}
              >
                <span className="header-nav-fav-wrap">
                  <svg
                    className="header-nav-heart-icon"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  <span>{t("header.favorites", "Mis Favoritos")}</span>
                  {favoritesCount > 0 && (
                    <span className="header-nav-fav-badge">{favoritesCount}</span>
                  )}
                </span>
              </li>
            </Link>
          </ul>
        </nav>

        {/* Acciones de la derecha: Cambiar asociación, Selector de idioma y Menú Hamburguesa */}
        <div className="header-laptop-right-actions">
          <Link
            to="/"
            className="header-switch-assoc-btn"
            title={t("header.switch_association")}
          >
            {t("header.switch_association")}
          </Link>

          <div className="header-language-selector">
            <LanguajeSelector />
          </div>

          {/* Botón Menú Hamburguesa solo en Tablet (eliminado en Desktop) */}
          {isTablet && (
            <button
              type="button"
              className={`header-laptop-hamburger-btn ${menuOpen ? "is-active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú hamburguesa" : "Abrir menú hamburguesa"}
              title="Menú de navegación"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" className="hamburger-svg-icon">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="hamburger-svg-icon">
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <span className="hamburger-label-text">{t("header.menu", "Menú")}</span>
              {favoritesCount > 0 && (
                <span className="hamburger-fav-dot" title={`${favoritesCount} favoritos`}>
                  {favoritesCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Menú Hamburguesa desplegable (Drawer) solo en Tablet */}
      {isTablet && menuOpen && (
        <div
          className="header-laptop-drawer-overlay"
          onClick={() => setMenuOpen(false)}
        >
          <aside
            ref={menuDrawerRef}
            className="header-laptop-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Menú desplegable de navegación"
          >
            <div className="drawer-header">
              <span className="drawer-title">{t("header.menu", "Menú")}</span>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            <nav className="drawer-nav">
              <ul>
                <Link to={homePath} onClick={() => setMenuOpen(false)}>
                  <li
                    className={`drawer-nav-item ${
                      currentPath === homePath ? "is-active" : ""
                    }`}
                  >
                    {t("header.home")}
                  </li>
                </Link>
                <a
                  href="#property-catalog-section"
                  onClick={(e) => {
                    handlePropertiesClick(e);
                    setMenuOpen(false);
                  }}
                >
                  <li className="drawer-nav-item">{t("header.properties")}</li>
                </a>
                <Link
                  to={`${homePath}/presentation`}
                  onClick={() => setMenuOpen(false)}
                >
                  <li
                    className={`drawer-nav-item ${
                      currentPath.includes("/presentation") ||
                      currentPath.includes("/about")
                        ? "is-active"
                        : ""
                    }`}
                  >
                    {t("header.about")}
                  </li>
                </Link>
                <Link to={`${homePath}/contact`} onClick={() => setMenuOpen(false)}>
                  <li
                    className={`drawer-nav-item ${
                      currentPath.includes("/contact") ? "is-active" : ""
                    }`}
                  >
                    {t("header.contact")}
                  </li>
                </Link>

                {/* Opción Mis Favoritos DENTRO del menú hamburguesa al final de la lista */}
                <Link to={`${homePath}/favorites`} onClick={() => setMenuOpen(false)}>
                  <li
                    className={`drawer-nav-item drawer-nav-fav-item ${
                      currentPath.includes("/favorites") ||
                      currentPath.includes("/favoritos")
                        ? "is-active"
                        : ""
                    }`}
                  >
                    <span className="drawer-fav-label">
                      <svg
                        className="drawer-fav-heart"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      <strong>{t("header.favorites", "Mis Favoritos")}</strong>
                    </span>
                    {favoritesCount > 0 && (
                      <span className="drawer-fav-badge">{favoritesCount}</span>
                    )}
                  </li>
                </Link>
              </ul>
            </nav>

            <div className="drawer-footer">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="drawer-switch-assoc-btn"
              >
                {t("header.switch_association")}
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default HeaderLaptopComponent;
