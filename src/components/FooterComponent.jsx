import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./../styles/FooterStyle.css";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelectorComponent";
import ScrollToTop from "./ScrollToTopComponent";

const socialLinks = [
  {
    id: "facebook",
    url: "#",
    imgSrc:
      "https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-64.png",
    alt: "Facebook",
  },
  {
    id: "x",
    url: "#",
    imgSrc:
      "https://cdn4.iconfinder.com/data/icons/social-media-black-white-2/1227/X-64.png",
    alt: "X",
  },
  {
    id: "instagram",
    url: "#",
    imgSrc:
      "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-64.png",
    alt: "Instagram",
  },
  {
    id: "linkedin",
    url: "#",
    imgSrc:
      "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-64.png",
    alt: "LinkedIn",
  },
];

const FooterComponent = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Función de validación que incluye el campo de teléfono.
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "El email no es válido.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido.";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "El teléfono no es válido.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido.";
    }
    return newErrors;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setSuccessMessage("");
        return;
      }
      console.log("Formulario enviado:", formData);
      setErrors({});
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSuccessMessage("¡Mensaje enviado correctamente!");
      setTimeout(() => setSuccessMessage(""), 3000);
    },
    [formData, validateForm]
  );

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Sección de contacto */}
        <div className="footer__contact">
          <h2 className="footer__heading">{t("footer.contact_title")}</h2>
          <p className="footer__description">
            {t("footer.contact_description")}
          </p>
        </div>
        <form className="footer__form" onSubmit={handleSubmit} noValidate>
          <div className="footer__form-group">
            <label className="footer__label" htmlFor="name">
              {t("footer.form.name_label")}
            </label>
            <input
              className="footer__input"
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
            />
            {errors.name && (
              <span className="footer__error">{errors.name}</span>
            )}
          </div>
          <div className="footer__form-group">
            <label className="footer__label" htmlFor="email">
              {t("footer.form.email_label")}
            </label>
            <input
              className="footer__input"
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
            {errors.email && (
              <span className="footer__error">{errors.email}</span>
            )}
          </div>
          <div className="footer__form-group">
            <label className="footer__label" htmlFor="phone">
              {t("footer.form.phone_label")}
            </label>
            <input
              className="footer__input"
              type="tel"
              id="phone"
              name="phone"
              placeholder="Tu teléfono"
              value={formData.phone}
              onChange={handleChange}
              required
              aria-required="true"
            />
            {errors.phone && (
              <span className="footer__error">{errors.phone}</span>
            )}
          </div>
          <div className="footer__form-group">
            <label className="footer__label" htmlFor="message">
              {t("footer.form.message_label")}{" "}
            </label>
            <textarea
              className="footer__textarea"
              id="message"
              name="message"
              placeholder="Tu mensaje"
              value={formData.message}
              onChange={handleChange}
              // Límite de 500 caracteres
              maxLength="500"
              required
              aria-required="true"
            ></textarea>
            {errors.message && (
              <span className="footer__error">{errors.message}</span>
            )}
          </div>
          <button className="footer__submit" type="submit">
            {t("footer.form.submit")}{" "}
          </button>
          {successMessage && (
            <p className="footer__success">{successMessage}</p>
          )}
        </form>
      </div>

      {/* Sección de redes sociales */}
      <div className="footer__social">
        <ul className="footer__social-list">
          {socialLinks.map((social) => (
            <li key={social.id} className="footer__social-item">
              <a
                className="footer__social-link"
                href={social.url}
                aria-label={social.alt}
              >
                <img src={social.imgSrc} alt={`Logo ${social.alt}`} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección inferior: Información legal y selector de idioma */}
      <div className="footer__bottom">
        <div className="footer__legal">
          <div className="footer__legal-row">
            <p className="footer__copyright">{t("footer.copyright")} </p>
          </div>
          <div className="footer__legal-row">
            <ul className="footer__links">
              <li className="footer__link-item">
                <Link className="footer__link" to="/aviso-legal">
                  {t("footer.legal")}
                </Link>
              </li>
              <li className="footer__link-item">
                <Link className="footer__link" to="/proteccion-de-datos">
                  {t("footer.data")}
                </Link>
              </li>
              <li className="footer__link-item">
                <Link className="footer__link" to="/politica-de-cookies">
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__legal-row">
            <div className="footer__language">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
      {/* Botón de Scroll dentro del footer */}
      <ScrollToTop />
    </footer>
  );
};

export default FooterComponent;
