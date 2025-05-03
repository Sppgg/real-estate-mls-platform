import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/LegalNoticeStyle.css";

const LegalNoticePage = () => {
  const { t } = useTranslation();

  return (
    <main className="legal-notice">
      <h1 className="legal-notice__title">{t("legalNotice.title")}</h1>
      <p className="legal-notice__intro">{t("legalNotice.intro")}</p>
      <section className="legal-notice__section">
        <h2 className="legal-notice__subtitle">
          {t("legalNotice.section1_title")}
        </h2>
        <p className="legal-notice__intro">{t("legalNotice.section1_text")}</p>
      </section>
      <section className="legal-notice__section">
        <h2 className="legal-notice__subtitle">
          {t("legalNotice.section2_title")}
        </h2>
        <p className="legal-notice__intro">{t("legalNotice.section2_text")}</p>
      </section>
      <section className="legal-notice__section">
        <h2 className="legal-notice__subtitle">
          {t("legalNotice.section3_title")}
        </h2>
        <p className="legal-notice__intro">{t("legalNotice.section3_text")}</p>
      </section>
      <section className="legal-notice__section">
        <h2 className="legal-notice__subtitle">
          {t("legalNotice.section4_title")}
        </h2>
        <p className="legal-notice__intro">{t("legalNotice.section4_text")}</p>
      </section>
    </main>
  );
};

export default LegalNoticePage;
