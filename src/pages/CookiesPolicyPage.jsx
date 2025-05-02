import React from "react";
import "../styles/CookiesPolicyStyle.css";

export const CookiesPolicyPage = () => {
  return (
    <main className="cookie-policy-page">
      <h1 className="cookie-policy__title">Política de Cookies</h1>
      <p className="cookie-policy__intro">
        Esta política de cookies explica qué son las cookies, cómo las
        utilizamos en nuestro sitio web y cómo puedes gestionarlas.
      </p>
      <section className="cookie-policy__section">
        <h2 className="cookie-policy__subtitle">¿Qué son las cookies?</h2>
        <p className="cookie-policy__text">
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo cuando visitas un sitio web. Permiten recordar información
          sobre tu visita y mejorar tu experiencia.
        </p>
      </section>
      <section className="cookie-policy__section">
        <h2 className="cookie-policy__subtitle">
          Cookies utilizadas en nuestro sitio
        </h2>
        <p className="cookie-policy__text">
          Utilizamos tanto cookies propias como de terceros para fines
          estadísticos, de personalización y para facilitar la navegación.
          Podrás encontrar más detalles sobre cada cookie en la siguiente
          sección.
        </p>
      </section>
      <section>
        <h2 className="cookie-policy__subtitle">
          Configuración y desactivación de cookies
        </h2>
        <p className="cookie-policy__text">
          Puedes modificar la configuración de tu navegador para rechazar o
          eliminar las cookies. Ten en cuenta que, al deshabilitarlas, algunas
          funcionalidades de nuestro sitio pueden no funcionar correctamente.
        </p>
      </section>
      <section className="cookie-policy__section">
        <h2 className="cookie-policy__subtitle">Contacto</h2>
        <p className="cookie-policy__text">
          Para cualquier consulta adicional sobre nuestra política de cookies,
          por favor, contáctanos en:{" "}
          <a className="cookie-policy__link" href="mailto:info@empresa.com">
            info@empresa.com
          </a>
        </p>
      </section>
    </main>
  );
};
export default CookiesPolicyPage;
