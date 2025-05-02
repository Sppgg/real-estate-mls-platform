import React from "react";
import "../styles/DataProtectionStyle.css";

export const DataProtectionPage = () => {
  return (
    <main className="data-protection">
      <h1 className="data-protection__title">
        Política de protección de datos
      </h1>
      <p className="data-protection__intro">
        En cumplimiento de la Ley Orgánica 3/2018, de 5 de diciembre, de
        Protección de Datos Personales y garantía de los derechos digitales, así
        como del Reglamento (UE) 2016/679 (RGPD), informamos lo siguiente:
      </p>
      <section className="data-protection__section">
        <h2 className="data-protection__subtitle">
          Responsable del Tratamiento
        </h2>
        <p className="data-protection__intro">
          La entidad <strong>[Nombre de la Empresa]</strong>, con domicilio en{" "}
          <strong>[Dirección]</strong> y CIF <strong>[XXX]</strong>, es la
          responsable del tratamiento de los datos personales que recabamos a
          través de este sitio web.
        </p>
      </section>
      <section className="data-protection__section">
        <h2 className="data-protection__subtitle">Finalidad</h2>
        <p className="data-protection__intro">
          Los datos personales facilitados se utilizarán para gestionar tus
          consultas, informar sobre nuestros servicios y, en su caso, para la
          realización de actividades de marketing directo, siempre en
          conformidad con la legislación vigente.
        </p>
      </section>
      <section className="data-protection__section">
        <h2 className="data-protection__subtitle">Derechos</h2>
        <p className="data-protection__intro">
          Puedes ejercer los derechos de acceso, rectificación, supresión,
          limitación del tratamiento, portabilidad y oposición enviando una
          solicitud a <a href="mailto:info@empresa.com">info@empresa.com</a>,
          acompañada de una copia de tu DNI o documento identificativo
          equivalente.
        </p>
      </section>
    </main>
  );
};
export default DataProtectionPage;
