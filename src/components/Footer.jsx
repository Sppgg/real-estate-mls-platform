import React, { useState } from "react";
import "./../styles/FooterStyle.css";

const Footer = () => {
  // Estados para el formulario de contacto
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario (por ejemplo, una llamada a una API)
    console.log("Formulario enviado:", formData);
    // Reinicia el formulario después del envío
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Sección de contacto */}
        <div className="footer__contact">
          <h2 className="footer__heading">Contáctanos</h2>
          <p className="footer__description">
            Si tienes alguna consulta, deja tus datos y nos pondremos en
            contacto contigo.
          </p>
        </div>
        <form className="footer__form" onSubmit={handleSubmit}>
          <div className="footer__form-group">
            <label className="footer__label" htmlFor="name">
              Nombre
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
            />
          </div>
          <div className="footer__form-group">
            <label className="footer__label" htmlFor="email">
              Email
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
            />
          </div>
          <div className="footer__form-group">
            <label className="footer__label" htmlFor="message">
              Mensaje
            </label>
            <textarea
              className="footer__textarea"
              id="message"
              name="message"
              placeholder="Tu mensaje"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button className="footer__submit" type="submit">
            Enviar
          </button>
        </form>
      </div>

      {/* Sección inferior: Información legal y selector de idioma */}
      <div className="footer__bottom">
        <div className="footer__legal">
          <div className="footer__legal-row">
            <p className="footer__copyright">
              &copy; 2025 Zoddak Real Estate, 3.0 Todos los derechos reservados.
            </p>
          </div>
          <div className="footer__legal-row">
            <ul className="footer__links">
              <li className="footer__link-item">
                <a className="footer__link" href="/aviso-legal">
                  Aviso legal
                </a>
              </li>
              <li className="footer__link-item">
                <a className="footer__link" href="/proteccion-datos">
                  Protección de datos
                </a>
              </li>
              <li className="footer__link-item">
                <a className="footer__link" href="/politica-cookies">
                  Política de cookies
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__legal-row">
            <div className="footer__language">
              <button className="footer__language-button" type="button">
                Español <span className="footer__language-icon">&#9662;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
