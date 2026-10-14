import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAssociation } from "../context/AssociationContext";
import { useProperties } from "../context/PropertiesContext";
import "../styles/aboutUsPage.css";

export default function AboutUsPage() {
  const { t } = useTranslation();
  const association = useAssociation();
  const properties = useProperties() || [];

  if (!association) return null;

  const fullAddress = [
    association.address?.street,
    association.address?.area,
    association.address?.city,
    association.address?.region,
    association.address?.country,
    association.address?.zipcode ? `CP ${association.address.zipcode}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="about-page-container">
      {/* Cabecera de Sobre nosotros */}
      <section className="about-hero">
        <div className="about-hero__inner">
          <h1 className="about-hero__title">{t("about.title")}</h1>
          <p className="about-hero__subtitle">{t("about.subtitle")}</p>
        </div>
      </section>

      <main className="about-content-wrapper">
        {/* Ficha de la Asociación */}
        <div className="about-assoc-card">
          <div className="about-assoc-card__logo-wrapper">
            <img
              src={association.image}
              alt={`Logotipo de ${association.name}`}
              className="about-assoc-card__logo"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div className="about-assoc-card__details">
            <h2 className="about-assoc-card__name">{association.name}</h2>
            <p className="about-assoc-card__bio">{association.bio}</p>
            {association.cif && (
              <span className="about-assoc-card__cif">
                {t("about.cif")}: {association.cif}
              </span>
            )}
          </div>
        </div>

        {/* Resumen del catálogo */}
        <section className="about-summary-card">
          <div className="about-summary-item">
            <span className="about-summary-label">{t("about.catalog_size")}</span>
            <span className="about-summary-value">{properties.length} propiedades activas</span>
          </div>
          {association.business_name && (
            <div className="about-summary-item">
              <span className="about-summary-label">Entidad gestora</span>
              <span className="about-summary-value">{association.business_name}</span>
            </div>
          )}
        </section>

        {/* Compromiso y Servicios */}
        <div className="about-two-col-section">
          <div className="about-card-box">
            <h3 className="about-card-box__title">{t("about.mission_title")}</h3>
            <p className="about-card-box__text">{t("about.mission_desc")}</p>
          </div>

          <div className="about-card-box">
            <h3 className="about-card-box__title">Servicios a clientes</h3>
            <ul className="about-values-list">
              <li className="about-value-item">
                <span className="about-value-bullet">•</span>
                <span>Asesoramiento integral en compraventa de inmuebles</span>
              </li>
              <li className="about-value-item">
                <span className="about-value-bullet">•</span>
                <span>Gestión de visitas y coordinación personalizada</span>
              </li>
              <li className="about-value-item">
                <span className="about-value-bullet">•</span>
                <span>Comprobación jurídica y registral de propiedades</span>
              </li>
              <li className="about-value-item">
                <span className="about-value-bullet">•</span>
                <span>Atención multilingüe para clientes internacionales</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Información oficial de contacto */}
        <section className="about-contact-sheet">
          <h3 className="about-contact-sheet__title">
            Datos de contacto de la asociación
          </h3>

          <div className="about-contact-items-grid">
            {fullAddress && (
              <div className="about-contact-item">
                <span className="about-contact-item__label">{t("about.address")}</span>
                <span className="about-contact-item__value">{fullAddress}</span>
              </div>
            )}

            {association.phone && (
              <div className="about-contact-item">
                <span className="about-contact-item__label">{t("about.phone")}</span>
                <a href={`tel:${association.phone}`} className="about-contact-item__value">
                  {association.phone}
                </a>
              </div>
            )}

            {association.mobile && (
              <div className="about-contact-item">
                <span className="about-contact-item__label">{t("about.mobile")}</span>
                <a href={`tel:${association.mobile}`} className="about-contact-item__value">
                  {association.mobile}
                </a>
              </div>
            )}

            {association.email && (
              <div className="about-contact-item">
                <span className="about-contact-item__label">{t("about.email")}</span>
                <a href={`mailto:${association.email}`} className="about-contact-item__value">
                  {association.email}
                </a>
              </div>
            )}

            {association.web && (
              <div className="about-contact-item">
                <span className="about-contact-item__label">{t("about.web")}</span>
                <span className="about-contact-item__value">{association.web}</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              to={`/association/${association._id}`}
              className="filter-apply-button"
              style={{ textDecoration: "none", display: "inline-block", textAlign: "center" }}
            >
              {t("about.cta_catalog")}
            </Link>
            <Link
              to={`/association/${association._id}/contact`}
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-principal)",
                border: "1px solid var(--color-border)",
                display: "inline-block",
                textAlign: "center",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--border-radius-md)",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              {t("about.cta_contact")}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
