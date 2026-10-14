import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LanguageSelectorStyle.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <select
      className="language-selector"
      value={i18n.language}
      onChange={handleLanguageChange}
      aria-label="Selector de idioma"
    >
      <option value="es">Español</option>
      <option value="en">English</option>

      {/* Agregamos más idiomas según sea necesario */}
    </select>
  );
};

export default LanguageSelector;
