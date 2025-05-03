// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      "footer": {
        "contact_title": "Contáctanos",
        "contact_description": "Si tienes alguna consulta, deja tus datos y nos pondremos en contacto contigo.",
        "form": {
          "name_label": "Nombre",
          "email_label": "Email",
          "phone_label": "Teléfono",
          "message_label": "Mensaje",
          "name_placeholder": "Tu nombre",
          "email_placeholder": "Tu email",
          "phone_placeholder": "Tu teléfono",
          "message_placeholder": "Tu mensaje",
          "submit": "Enviar"
        },
        "copyright": "© 2025 Zoddak Real Estate, Todos los derechos reservados.",
        "legal": "Aviso legal",
        "data": "Protección de datos",
        "cookies": "Política de cookies"
      },
      legalNotice: {
        title: "Aviso legal",
        intro: "Bienvenido a nuestro sitio web. Este Aviso Legal regula el uso del sitio, la responsabilidad sobre la información contenida en el mismo y los derechos de propiedad intelectual.",
        section1_title: "1. Información general",
        section1_text: "El sitio web es operado por Zoddak Real Estate, con domicilio en [Dirección de la empresa], y CIF [Número de identificación fiscal].",
        section2_title: "2. Propiedad intelectual",
        section2_text: "Todos los contenidos del sitio web, incluyendo textos, imágenes, gráficos, logotipos y software, están protegidos por derechos de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización previa.",
        section3_title: "3. Uso del sitio web",
        section3_text: "El usuario se compromete a utilizar el sitio web de conformidad con la ley y a no realizar actividades que puedan dañar la imagen, intereses o derechos de Zoddak Real Estate o de terceros.",
        section4_title: "4. Limitación de responsabilidad",
        section4_text: "Zoddak Real Estate no se hace responsable de los daños y perjuicios que puedan derivarse del uso indebido del sitio web o de la información contenida en el mismo."
      },
      dataProtection: {
        title: "Política de protección de datos",
        intro:
          "En cumplimiento de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales, así como del Reglamento (UE) 2016/679 (RGPD), informamos lo siguiente:",
        section1_title: "Responsable del Tratamiento",
        section1_text:
          "La entidad [Nombre de la Empresa], con domicilio en [Dirección] y CIF [XXX], es la responsable del tratamiento de los datos personales que recabamos a través de este sitio web.",
        section2_title: "Finalidad",
        section2_text:
          "Los datos personales facilitados se utilizarán para gestionar tus consultas, informar sobre nuestros servicios y, en su caso, para la realización de actividades de marketing directo, siempre en conformidad con la legislación vigente.",
        section3_title: "Derechos",
        section3_text:
          "Puedes ejercer los derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición enviando una solicitud a info@empresa.com, acompañada de una copia de tu DNI o documento identificativo equivalente."
      },
      cookiesPolicy: {
        title: "Política de Cookies",
        intro:
          "Esta política de cookies explica qué son las cookies, cómo las utilizamos en nuestro sitio web y cómo puedes gestionarlas.",
        section1_title: "¿Qué son las cookies?",
        section1_text:
          "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten recordar información sobre tu visita y mejorar tu experiencia.",
        section2_title: "Cookies utilizadas en nuestro sitio",
        section2_text:
          "Utilizamos tanto cookies propias como de terceros para fines estadísticos, de personalización y para facilitar la navegación. Podrás encontrar más detalles sobre cada cookie en la siguiente sección.",
        section3_title: "Configuración y desactivación de cookies",
        section3_text:
          "Puedes modificar la configuración de tu navegador para rechazar o eliminar las cookies. Ten en cuenta que, al deshabilitarlas, algunas funcionalidades de nuestro sitio pueden no funcionar correctamente.",
        section4_title: "Contacto",
        section4_text:
          "Para cualquier consulta adicional sobre nuestra política de cookies, por favor, contáctanos en:",
        link: "info@empresa.com"
      },
      // ... otras claves
    }
  },
  en: {
    translation: {
      "footer": {
        "contact_title": "Contact us",
        "contact_description": "If you have any question, please leave your details and we will get in touch soon.",
        "form": {
          "name_label": "Name",
          "email_label": "Email",
          "phone_label": "Phone",
          "message_label": "Message",
          "name_placeholder": "Your name",
          "email_placeholder": "Your email",
          "phone_placeholder": "Your phone number",
          "message_placeholder": "Your message",
          "submit": "Send"
        },
        "copyright": "© 2025 Zoddak Real Estate, All rights reserved.",
        "legal": "Legal Notice",
        "data": "Data Protection",
        "cookies": "Cookie Policy"
      },
      legalNotice: {
        title: "Legal Notice",
        intro: "Welcome to our website. This Legal Notice regulates the use of the site, the responsibilities regarding the provided information, and intellectual property rights.",
        section1_title: "1. General Information",
        section1_text: "The website is operated by Zoddak Real Estate, located at [Company Address], with tax ID [Tax Identification Number].",
        section2_title: "2. Intellectual Property",
        section2_text: "All content on the website, including texts, images, graphics, logos, and software, is protected by intellectual property rights. Any total or partial reproduction without prior permission is prohibited.",
        section3_title: "3. Website Use",
        section3_text: "The user agrees to use the website in accordance with the law and to refrain from engaging in activities that could harm the image, interests, or rights of Zoddak Real Estate or third parties.",
        section4_title: "4. Limitation of Liability",
        section4_text: "Zoddak Real Estate is not responsible for any damages or losses resulting from the misuse of the website or the information contained therein."
      },
      dataProtection: {
        title: "Data Protection Policy",
        intro:
          "In compliance with Organic Law 3/2018 of December 5 on Personal Data Protection and guarantee of digital rights, as well as Regulation (EU) 2016/679 (GDPR), we inform you as follows:",
        section1_title: "Data Controller",
        section1_text:
          "The entity [Company Name], located at [Address] and with Tax ID [XXX], is responsible for the processing of personal data collected through this website.",
        section2_title: "Purpose",
        section2_text:
          "The personal data provided will be used to manage your inquiries, to inform you about our services, and, if applicable, for direct marketing activities, always in accordance with current legislation.",
        section3_title: "Rights",
        section3_text:
          "You can exercise your rights of access, rectification, deletion, limitation of processing, data portability, and objection by sending a request to info@company.com, accompanied by a copy of your ID or equivalent identification document."
      },
      cookiesPolicy: {
        title: "Cookie Policy",
        intro:
          "This Cookie Policy explains what cookies are, how we use them on our website, and how you can manage them.",
        section1_title: "What are cookies?",
        section1_text:
          "Cookies are small text files that are stored on your device when you visit a website. They allow the website to remember information about your visit and improve your experience.",
        section2_title: "Cookies used on our site",
        section2_text:
          "We use both first-party and third-party cookies for statistical, personalization purposes, and to facilitate navigation. More details about each cookie can be found in the following section.",
        section3_title: "Managing and disabling cookies",
        section3_text:
          "You can modify your browser settings to reject or remove cookies. Please note that by disabling them, some functionalities of our website might not work correctly.",
        section4_title: "Contact",
        section4_text:
          "For any further inquiries regarding our cookie policy, please contact us at:",
        link: "info@company.com"
      },
      // ... otras claves
    }
  },
};


i18n.use(initReactI18next).init({
  resources,
  lng: "en", // idioma por defecto
  fallbackLng: "es", // idioma de respaldo
  interpolation: {
    escapeValue: false, // React ya hace el escape
  },
});

export default i18n;
