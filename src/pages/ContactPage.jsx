import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAssociation } from "../context/AssociationContext";
import "../styles/contactPage.css";

export default function ContactPage() {
  const { t } = useTranslation();
  const association = useAssociation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "info",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  if (!association) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "info",
      message: "",
      consent: false,
    });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const faqs = t("contact.faqs", { returnObjects: true }) || [];

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
    <div className="contact-page-container">
      {/* Cabecera */}
      <section className="contact-hero">
        <div className="contact-hero__inner">
          <h1 className="contact-hero__title">{t("contact.title")}</h1>
          <p className="contact-hero__subtitle">{t("contact.subtitle")}</p>
        </div>
      </section>

      {/* Grid: Formulario + Datos oficiales de la Asociación */}
      <main className="contact-main-grid">
        {/* Formulario */}
        <section className="contact-form-card">
          <h2 className="contact-form-title">{t("contact.form_title")}</h2>

          {submitted ? (
            <div className="contact-success-banner">
              {t("contact.success")}
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-field-group">
                <label htmlFor="contact-name">{t("contact.name_label")}</label>
                <input
                  type="text"
                  id="contact-name"
                  required
                  placeholder={t("contact.name_placeholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-email">{t("contact.email_label")}</label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  placeholder={t("contact.email_placeholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-phone">{t("contact.phone_label")}</label>
                <input
                  type="tel"
                  id="contact-phone"
                  required
                  placeholder={t("contact.phone_placeholder")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-subject">{t("contact.subject_label")}</label>
                <select
                  id="contact-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="info">{t("contact.subject_options.info")}</option>
                  <option value="visit">{t("contact.subject_options.visit")}</option>
                  <option value="sell">{t("contact.subject_options.sell")}</option>
                  <option value="join">{t("contact.subject_options.join")}</option>
                  <option value="other">{t("contact.subject_options.other")}</option>
                </select>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-message">{t("contact.message_label")}</label>
                <textarea
                  id="contact-message"
                  rows="4"
                  required
                  placeholder={t("contact.message_placeholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <label className="contact-consent-label">
                <input
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                />
                <span>{t("contact.privacy_consent")}</span>
              </label>

              <button type="submit" className="contact-submit-btn">
                {t("contact.submit")}
              </button>
            </form>
          )}
        </section>

        {/* Datos de contacto oficiales */}
        <aside className="contact-sidebar">
          <div className="contact-info-card">
            <h3 className="contact-info-card__title">{association.name}</h3>
            <div className="contact-info-list">
              {fullAddress && (
                <div className="contact-info-row">
                  <div className="contact-info-content">
                    <strong>{t("about.address")}</strong>
                    <span>{fullAddress}</span>
                  </div>
                </div>
              )}

              {association.phone && (
                <div className="contact-info-row">
                  <div className="contact-info-content">
                    <strong>{t("about.phone")}</strong>
                    <a href={`tel:${association.phone}`}>{association.phone}</a>
                  </div>
                </div>
              )}

              {association.mobile && (
                <div className="contact-info-row">
                  <div className="contact-info-content">
                    <strong>{t("about.mobile")}</strong>
                    <a href={`tel:${association.mobile}`}>{association.mobile}</a>
                  </div>
                </div>
              )}

              {association.email && (
                <div className="contact-info-row">
                  <div className="contact-info-content">
                    <strong>{t("about.email")}</strong>
                    <a href={`mailto:${association.email}`}>{association.email}</a>
                  </div>
                </div>
              )}

              {association.web && (
                <div className="contact-info-row">
                  <div className="contact-info-content">
                    <strong>{t("about.web")}</strong>
                    <span>{association.web}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="contact-info-card" style={{ backgroundColor: "#fafbfc" }}>
            <h3 className="contact-info-card__title" style={{ fontSize: "1.1rem" }}>
              {t("contact.office_hours_title")}
            </h3>
            <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--color-text)", lineHeight: 1.5 }}>
              {t("contact.office_hours")}
            </p>
          </div>
        </aside>
      </main>

      {/* Preguntas frecuentes */}
      {Array.isArray(faqs) && faqs.length > 0 && (
        <section className="contact-faqs-section">
          <h2 className="contact-faqs-title">{t("contact.faq_title")}</h2>
          <div className="contact-faq-accordion">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="contact-faq-item">
                  <button
                    type="button"
                    className="contact-faq-question"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && <div className="contact-faq-answer">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
