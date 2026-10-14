// src/i18n.js -> página de configuración de i18next para la internacionalización de la aplicación
// Este archivo contiene las traducciones para los textos de la aplicación en inglés y español.

// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      "home": {
        "results": "{{count}} propiedades encontradas",
        "mock_catalog": "Catálogo de demostración con datos de ejemplo, no anuncios reales.",
        "no_results": "No hay propiedades que coincidan con los filtros."
      },
      "header": {
        "home": "Inicio",
        "about": "Nosotros",
        "contact": "Contacto"
      },
      "filter_house": {
        "title": "Filtrar viviendas",
        "type": "Tipo de vivienda",
        "select_type": "Selecciona un tipo",
        "new_construction": "Obra nueva",
        "area": "Área",
        "area_placeholder": "Ingresa el área (ej. Marbella)",
        "subarea": "Subárea",
        "subarea_placeholder": "Ingresa la subárea (ej. San Pedro de Alcántara)",
        "apply": "Aplicar filtros",
        "types": {
          "Adosado": "Adosado",
          "Almacén": "Almacén",
          "Amarre": "Amarre",
          "Apartahotel": "Apartahotel",
          "Apartamento": "Apartamento",
          "Apartamento en Planta Baja": "Apartamento en Planta Baja",
          "Apartamento en Última Planta": "Apartamento en Última Planta",
          "Barco": "Barco",
          "Bungalow": "Bungalow",
          "Casa": "Casa",
          "Casa de Madera": "Casa de Madera",
          "Chalet": "Chalet",
          "Complejo de Apartamentos": "Complejo de Apartamentos",
          "Dúplex": "Dúplex",
          "Edificio": "Edificio",
          "Estudio": "Estudio",
          "Estudio en Planta Baja": "Estudio en Planta Baja",
          "Estudio en Última Planta": "Estudio en Última Planta",
          "Finca": "Finca",
          "Finca - Cortijo": "Finca - Cortijo",
          "Finca con Ruinas": "Finca con Ruinas",
          "Garaje": "Garaje",
          "Granja": "Granja",
          "Hostal": "Hostal",
          "Hotel": "Hotel",
          "Local Comercial": "Local Comercial",
          "Nave Industrial": "Nave Industrial",
          "Negocio": "Negocio",
          "Otros": "Otros",
          "Palacio": "Palacio",
          "Parcela": "Parcela",
          "Parcela Comercial": "Parcela Comercial",
          "Parcela Industrial": "Parcela Industrial",
          "Parcela Residencial": "Parcela Residencial",
          "Parcela Rústica": "Parcela Rústica",
          "Parcela para Golf": "Parcela para Golf",
          "Terreno Urbanizable": "Terreno Urbanizable",
          "Trastero": "Trastero",
          "Villa Aislada": "Villa Aislada",
          "Villa Pareada": "Villa Pareada",
          "Ático": "Ático",
          "Ático Dúplex": "Ático Dúplex"
        }
      },
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
        "copyright": "© 2025 Elizabeth González and Sara del Pozo Real Estate, Todos los derechos reservados.",
        "legal": "Aviso legal",
        "data": "Protección de datos",
        "cookies": "Política de cookies"
      },
      "legalNotice": {
        "title": "Aviso legal",
        "intro": "Bienvenido a nuestro sitio web. Este Aviso Legal regula el uso del sitio, la responsabilidad sobre la información contenida en el mismo y los derechos de propiedad intelectual.",
        "section1_title": "1. Información general",
        "section1_text": "El sitio web es operado por Elizabeth González and Sara del Pozo Real Estate, con domicilio en [Dirección de la empresa], y CIF [Número de identificación fiscal].",
        "section2_title": "2. Propiedad intelectual",
        "section2_text": "Todos los contenidos del sitio web, incluyendo textos, imágenes, gráficos, logotipos y software, están protegidos por derechos de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización previa.",
        "section3_title": "3. Uso del sitio web",
        "section3_text": "El usuario se compromete a utilizar el sitio web de conformidad con la ley y a no realizar actividades que puedan dañar la imagen, intereses o derechos de Elizabeth González and Sara del Pozo Real Estate o de terceros.",
        "section4_title": "4. Limitación de responsabilidad",
        "section4_text": "Elizabeth González and Sara del Pozo Real Estate no se hace responsable de los daños y perjuicios que puedan derivarse del uso indebido del sitio web o de la información contenida en el mismo."
      },
      "dataProtection": {
        "title": "Política de protección de datos",
        "intro": "En cumplimiento de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales, así como del Reglamento (UE) 2016/679 (RGPD), informamos lo siguiente:",
        "section1_title": "Responsable del Tratamiento",
        "section1_text": "La entidad [Nombre de la Empresa], con domicilio en [Dirección] y CIF [XXX], es la responsable del tratamiento de los datos personales que recabamos a través de este sitio web.",
        "section2_title": "Finalidad",
        "section2_text": "Los datos personales facilitados se utilizarán para gestionar tus consultas, informar sobre nuestros servicios y, en su caso, para la realización de actividades de marketing directo, siempre en conformidad con la legislación vigente.",
        "section3_title": "Derechos",
        "section3_text": "Puedes ejercer los derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad y oposición enviando una solicitud a info@empresa.com, acompañada de una copia de tu DNI o documento identificativo equivalente."
      },
      "cookiesPolicy": {
        "title": "Política de Cookies",
        "intro": "Esta política de cookies explica qué son las cookies, cómo las utilizamos en nuestro sitio web y cómo puedes gestionarlas.",
        "section1_title": "¿Qué son las cookies?",
        "section1_text": "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten recordar información sobre tu visita y mejorar tu experiencia.",
        "section2_title": "Cookies utilizadas en nuestro sitio",
        "section2_text": "Utilizamos tanto cookies propias como de terceros para fines estadísticos, de personalización y para facilitar la navegación. Podrás encontrar más detalles sobre cada cookie en la siguiente sección.",
        "section3_title": "Configuración y desactivación de cookies",
        "section3_text": "Puedes modificar la configuración de tu navegador para rechazar o eliminar las cookies. Ten en cuenta que, al deshabilitarlas, algunas funcionalidades de nuestro sitio pueden no funcionar correctamente.",
        "section4_title": "Contacto",
        "section4_text": "Para cualquier consulta adicional sobre nuestra política de cookies, por favor, contáctanos en:",
        "link": "info@empresa.com"
      }
    }
  },
  en: {
    translation: {
      "home": {
        "results": "{{count}} properties found",
        "mock_catalog": "Demo catalog with sample data, not real listings.",
        "no_results": "No properties match the selected filters."
      },
      "header": {
        "home": "Home",
        "about": "About Us",
        "contact": "Contact"
      },
      "filter_house": {
        "title": "Filter Properties",
        "type": "Property Type",
        "select_type": "Select a type",
        "new_construction": "New Construction",
        "area": "Area",
        "area_placeholder": "Enter the area (e.g., Marbella)",
        "subarea": "Subarea",
        "subarea_placeholder": "Enter the subarea (e.g., San Pedro de Alcántara)",
        "apply": "Apply filters",
        "types": {
          "Adosado": "Terraced House",
          "Almacén": "Warehouse",
          "Amarre": "Mooring",
          "Apartahotel": "Apart-hotel",
          "Apartamento": "Apartment",
          "Apartamento en Planta Baja": "Ground Floor Apartment",
          "Apartamento en Última Planta": "Penthouse Apartment",
          "Barco": "Boat",
          "Bungalow": "Bungalow",
          "Casa": "House",
          "Casa de Madera": "Wooden House",
          "Chalet": "Chalet",
          "Complejo de Apartamentos": "Apartment Complex",
          "Dúplex": "Duplex",
          "Edificio": "Building",
          "Estudio": "Studio",
          "Estudio en Planta Baja": "Ground Floor Studio",
          "Estudio en Última Planta": "Penthouse Studio",
          "Finca": "Estate",
          "Finca - Cortijo": "Estate – Country House",
          "Finca con Ruinas": "Estate with Ruins",
          "Garaje": "Garage",
          "Granja": "Farm",
          "Hostal": "Hostel",
          "Hotel": "Hotel",
          "Local Comercial": "Commercial Space",
          "Nave Industrial": "Industrial Warehouse",
          "Negocio": "Business",
          "Otros": "Others",
          "Palacio": "Palace",
          "Parcela": "Plot",
          "Parcela Comercial": "Commercial Plot",
          "Parcela Industrial": "Industrial Plot",
          "Parcela Residencial": "Residential Plot",
          "Parcela Rústica": "Rural Plot",
          "Parcela para Golf": "Golf Plot",
          "Terreno Urbanizable": "Developable Land",
          "Trastero": "Storage Room",
          "Villa Aislada": "Detached Villa",
          "Villa Pareada": "Semi-detached Villa",
          "Ático": "Penthouse",
          "Ático Dúplex": "Duplex Penthouse"
        }
      },
      "footer": {
        "contact_title": "Contact us",
        "contact_description": "If you have any questions, please leave your details and we will get in touch soon.",
        "form": {
          "name_label": "Name",
          "email_label": "Email",
          "phone_label": "Phone",
          "message_label": "Message",
          "name_placeholder": "Your name",
          "email_placeholder": "Your email",
          "phone_placeholder": "Your phone number",
          "message_placeholder": "Your message",
          "submit": "Submit"
        },
        "copyright": "© 2025 Elizabeth González and Sara del Pozo Real Estate, All rights reserved.",
        "legal": "Legal Notice",
        "data": "Data Protection",
        "cookies": "Cookie Policy"
      },
      "legalNotice": {
        "title": "Legal Notice",
        "intro": "Welcome to our website. This Legal Notice regulates the use of the site, the responsibilities regarding the provided information, and intellectual property rights.",
        "section1_title": "1. General Information",
        "section1_text": "The website is operated by Elizabeth González and Sara del Pozo Real Estate, located at [Company Address], with tax ID [Tax Identification Number].",
        "section2_title": "2. Intellectual Property",
        "section2_text": "All content on the website, including texts, images, graphics, logos, and software, is protected by intellectual property rights. Any total or partial reproduction without prior permission is prohibited.",
        "section3_title": "3. Website Use",
        "section3_text": "The user agrees to use the website in accordance with the law and to refrain from activities that could harm the image, interests, or rights of Elizabeth González and Sara del Pozo Real Estate or third parties.",
        "section4_title": "4. Limitation of Liability",
        "section4_text": "Elizabeth González and Sara del Pozo Real Estate is not responsible for any damages or losses resulting from the misuse of the website or the information contained therein."
      },
      "dataProtection": {
        "title": "Data Protection Policy",
        "intro": "In compliance with Organic Law 3/2018 of December 5 on Personal Data Protection and the guarantee of digital rights, as well as Regulation (EU) 2016/679 (GDPR), we inform you as follows:",
        "section1_title": "Data Controller",
        "section1_text": "The entity [Company Name], located at [Address] and with Tax ID [XXX], is responsible for the processing of personal data collected through this website.",
        "section2_title": "Purpose",
        "section2_text": "The personal data provided will be used to manage your inquiries, to inform you about our services, and, if applicable, for direct marketing activities, always in accordance with current legislation.",
        "section3_title": "Rights",
        "section3_text": "You can exercise your rights of access, rectification, deletion, limitation of processing, data portability, and objection by sending a request to info@company.com along with a copy of your ID or equivalent identification document."
      },
      "cookiesPolicy": {
        "title": "Cookie Policy",
        "intro": "This Cookie Policy explains what cookies are, how we use them on our website, and how you can manage them.",
        "section1_title": "What are cookies?",
        "section1_text": "Cookies are small text files stored on your device when you visit a website. They allow the website to remember information about your visit and improve your experience.",
        "section2_title": "Cookies used on our site",
        "section2_text": "We use both first-party and third-party cookies for statistical, personalization purposes, and to facilitate navigation. More details about each cookie can be found in the following section.",
        "section3_title": "Managing and disabling cookies",
        "section3_text": "You can modify your browser settings to reject or remove cookies. Please note that by disabling them, some functionalities of our website might not work correctly.",
        "section4_title": "Contact",
        "section4_text": "For any further inquiries regarding our cookie policy, please contact us at:",
        "link": "info@company.com"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",   // Idioma por defecto
  fallbackLng: "es", // Lenguaje de respaldo
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
