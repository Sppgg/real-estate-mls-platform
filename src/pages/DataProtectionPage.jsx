import React from "react";
import "../styles/DataProtectionStyle.css";
import { useTranslation } from "react-i18next";

const DataProtectionPage = () => {
  const { t } = useTranslation();

  return (
    <main className="data-protection">
      <h1 className="data-protection__title">{t("dataProtection.title")}</h1>
      <p className="data-protection__intro">{t("dataProtection.intro")}</p>
      <section className="data-protection__section">
        <h2 className="data-protection__subtitle">
          {t("dataProtection.section1_title")}
        </h2>
        <p className="data-protection__intro">
          {t("dataProtection.section1_text")}
        </p>
      </section>
      <section className="data-protection__section">
        <h2 className="data-protection__subtitle">
          {t("dataProtection.section2_title")}
        </h2>
        <p className="data-protection__intro">
          {t("dataProtection.section2_text")}
        </p>
      </section>
      <section className="data-protection__section">
        <h2 className="data-protection__subtitle">
          {t("dataProtection.section3_title")}
        </h2>
        <p className="data-protection__intro">
          {t("dataProtection.section3_text")}
        </p>
      </section>
    </main>
  );
};

export default DataProtectionPage;
