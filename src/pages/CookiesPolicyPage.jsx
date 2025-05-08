import React from "react";
import "../styles/CookiesPolicyStyle.css";
import { useTranslation } from "react-i18next";

const CookiesPolicyPage = () => {
  const { t } = useTranslation();

  return (
    <main className="cookie-policy-page">
      <h1 className="cookie-policy__title">{t("cookiesPolicy.title")}</h1>
      <p className="cookie-policy__intro">{t("cookiesPolicy.intro")}</p>
      <section className="cookie-policy__section">
        <h2 className="cookie-policy__subtitle">
          {t("cookiesPolicy.section1_title")}
        </h2>
        <p className="cookie-policy__text">
          {t("cookiesPolicy.section1_text")}
        </p>
      </section>
      <section className="cookie-policy__section">
        <h2 className="cookie-policy__subtitle">
          {t("cookiesPolicy.section2_title")}
        </h2>
        <p className="cookie-policy__text">
          {t("cookiesPolicy.section2_text")}
        </p>
      </section>
      <section className="cookie-policy__section">
        <h2 className="cookie-policy__subtitle">
          {t("cookiesPolicy.section3_title")}
        </h2>
        <p className="cookie-policy__text">
          {t("cookiesPolicy.section3_text")}
        </p>
      </section>
      <section className="cookie-policy__section">
        <h2 className="cookie-policy__subtitle">
          {t("cookiesPolicy.section4_title")}
        </h2>
        <p className="cookie-policy__text">
          {t("cookiesPolicy.section4_text")}{" "}
          <a className="cookie-policy__link" href="mailto:info@empresa.com">
            {t("cookiesPolicy.link")}
          </a>
        </p>
      </section>
    </main>
  );
};

export default CookiesPolicyPage;
