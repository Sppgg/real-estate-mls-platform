import React from "react";

const LegalNotice = () => {
  return (
    <main className="legal-notice-page">
      <h1>Aviso legal</h1>
      <p>
        Bienvenido a nuestro sitio web. Este Aviso Legal regula el uso del
        sitio, la responsabilidad sobre la información contenida en el mismo y
        los derechos de propiedad intelectual.
      </p>
      <section>
        <h2>1. Información general</h2>
        <p>
          El sitio web es operado por Zoddak Real Estate, con domicilio en
          [Dirección de la empresa], y CIF [Número de identificación fiscal].
        </p>
      </section>
      <section>
        <h2>2. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del sitio web, incluyendo textos, imágenes,
          gráficos, logotipos y software, están protegidos por derechos de
          propiedad intelectual. Queda prohibida su reproducción total o parcial
          sin autorización previa.
        </p>
      </section>
      <section>
        <h2>3. Uso del sitio web</h2>
        <p>
          El usuario se compromete a utilizar el sitio web de conformidad con la
          ley y a no realizar actividades que puedan dañar la imagen, intereses
          o derechos de Zoddak Real Estate o de terceros.
        </p>
      </section>
      <section>
        <h2>4. Limitación de responsabilidad</h2>
        <p>
          Zoddak Real Estate no se hace responsable de los daños y perjuicios
          que puedan derivarse del uso indebido del sitio web o de la
          información contenida en el mismo.
        </p>
      </section>
    </main>
  );
};

export default LegalNotice;
