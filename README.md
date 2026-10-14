# 🏡 Real Estate MLS Platform

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7.5-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![i18next](https://img.shields.io/badge/i18n-i18next_v25-26A69A?style=flat-square&logo=i18next&logoColor=white)](https://www.i18next.com/)
[![CI](https://github.com/Sppgg/real-estate-mls-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/Sppgg/real-estate-mls-platform/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Real Estate MLS Platform** es una aplicación web moderna, interactiva y de alto rendimiento diseñada para la exploración, filtrado y gestión de catálogos inmobiliarios exclusivos. Diseñada para inmobiliarias y redes de asociaciones (MLS), ofrece una experiencia fluida e intuitiva tanto para compradores como para agentes inmobiliarios.

---

## 🌟 Características Principales

- **🏢 Multi-Asociación Inmobiliaria**: Soporta múltiples redes inmobiliarias (ej. Costa del Sol Real Estate MLS) con personalización de identidad, datos de contacto y catálogos diferenciados.
- **🔍 Búsqueda y Filtrado Avanzado**:
  - Selector múltiple de localidades con autocompletado y buscador en tiempo real.
  - Selector múltiple de tipologías de inmueble (apartamentos, villas, áticos, chalets, etc.).
  - Filtros por rango de precios, número de dormitorios, baños y características clave (piscina, terraza, garaje, ascensor, vistas al mar, etc.).
- **👁️ Tres Modos de Visualización del Catálogo**:
  - **Cuadrícula (Grid View)**: Tarjetas visuales con fotografía principal, etiquetas de tipo/obra nueva, resumen de specs y acceso rápido.
  - **Lista (List View)**: Vista horizontal con información expandida de cada inmueble, ideal para comparar especificaciones rápidamente.
  - **Mapa Interactivo (Map Discovery)**: Mapa mock interactivo con marcadores geolocalizados, filtro por áreas, controles de zoom/arrastre y enlace directo con Google Maps respetando la privacidad de ubicación.
- **📋 Ficha Detallada de Propiedad**:
  - Disponible tanto en ventana modal emergente como en página completa con URL permalink dedicada (`/association/:id/properties/:propertyId`).
  - Galería fotográfica interactiva.
  - Especificaciones técnicas completas (superficie construida, parcela, terraza, año de edificación).
  - Gastos e impuestos detallados (comunidad, IBI, tasa de basuras) y calificación de eficiencia energética (consumo y emisiones CO₂).
  - Formulario de contacto directo con la agencia para solicitar información o visitas.
- **🕒 Vistos Recientemente**: Historial que registra automáticamente en `sessionStorage` las últimas 3 propiedades consultadas por el usuario durante la sesión activa.
- **❤️ Sistema de Favoritos**:
  - Marcado instantáneo de inmuebles favoritos mediante botón con icono de corazón animado.
  - Persistencia local en `localStorage` sincronizada en toda la aplicación.
  - Página dedicada (`/association/:id/favorites`) para consultar, comparar y gestionar los inmuebles guardados.
- **🌐 Internacionalización Completa (i18n)**: Soporte bilingüe integral en **Español** e **Inglés**, con cambio de idioma instantáneo sin recargar la página.
- **📱 Diseño Totalmente Responsivo**: Experiencia optimizada para móviles, tablets y ordenadores con navegación adaptativa (menú desplegable en pantallas táctiles y barra horizontal en escritorio).

---

## 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Biblioteca UI** | [React 19](https://react.dev/) | Renderizado reactivo mediante componentes funcionales y Hooks. |
| **Herramienta de Build** | [Vite 6](https://vitejs.dev/) | Entorno de desarrollo rápido con soporte para SWC Fast Refresh. |
| **Enrutamiento** | [React Router v7](https://reactrouter.com/) | Sistema de rutas declarativo con rutas anidadas (`nested routes`) y gestión de parámetros de URL. |
| **Internacionalización** | [i18next](https://www.i18next.com/) & [react-i18next](https://react.i18next.com/) | Gestión de recursos de idiomas, interpolación y cambio dinámico de contexto lingüístico. |
| **Gestión de Estado** | React Context API | Contextos modulares para Asociaciones, Favoritos y Catálogo de Propiedades. |
| **Almacenamiento Local** | `localStorage` & `sessionStorage` | Persistencia de favoritos del usuario y registro de historial de navegación reciente. |
| **Estilos** | CSS3 Modular & Variables CSS | Sistema de diseño coherente basado en variables CSS (`custom properties`), sin dependencias CSS pesadas. |
| **Control de Calidad** | [ESLint v9](https://eslint.org/) | Reglas estrictas de calidad de código y buenas prácticas de React Hooks. |

---

## 📁 Estructura del Proyecto

```text
real-estate-mls-platform/
├── public/                     # Archivos estáticos públicos (logos, favicon, imágenes)
│   ├── favicon.png
│   ├── logocostadelsol.png
│   └── mock/                   # Datos mock de respaldo
├── src/
│   ├── assets/                 # Recursos gráficos adicionales
│   ├── components/             # Componentes reutilizables de la interfaz
│   │   ├── BrandLogo.jsx              # Logotipo dinámico según la asociación
│   │   ├── CarouselHomeComponent.jsx  # Carrusel hero destacado
│   │   ├── FooterComponent.jsx        # Pie de página y enlaces legales
│   │   ├── LanguageSelectorComponent.jsx # Conmutador de idiomas (ES/EN)
│   │   ├── MultiLocationSelector.jsx  # Selector desplegable de ubicaciones
│   │   ├── MultiTypeSelector.jsx      # Selector múltiple de tipos de vivienda
│   │   ├── PropertyCard.jsx           # Tarjeta de inmueble (modos Grid y List)
│   │   ├── PropertyDetailModal.jsx    # Modal con ficha completa de la propiedad
│   │   ├── PropertyFilterComponent.jsx# Panel de filtros avanzado
│   │   ├── PropertyList.jsx           # Contenedor del catálogo (vistas Grid/List/Map)
│   │   ├── RecentlyViewedSection.jsx  # Sección de propiedades vistas recientemente
│   │   ├── ScrollToTopComponent.jsx   # Botón flotante para volver arriba
│   │   ├── header/                    # Barra de navegación superior y menús
│   │   ├── layouts/                   # Layout principal (MainLayout)
│   │   └── map/                       # Componentes de mapa interactivo
│   │       ├── PropertyMapDiscovery.jsx # Descubrimiento en mapa con pins
│   │       └── PropertyLocationMap.jsx  # Mapa de ubicación en ficha de propiedad
│   ├── context/                # Proveedores de estado global (Context API)
│   │   ├── AllAssociationsContext.jsx # Listado de asociaciones disponibles
│   │   ├── AssociationContext.jsx     # Asociación actualmente seleccionada
│   │   ├── FavoritesContext.jsx       # Gestión y persistencia de favoritos
│   │   └── PropertiesContext.jsx      # Acceso al catálogo de inmuebles
│   ├── customHook/             # Custom React Hooks reutilizables
│   ├── pages/                  # Páginas principales de la aplicación
│   │   ├── AboutUsPage.jsx            # Quiénes somos y presentación
│   │   ├── AssociationSelectorPage.jsx# Selector inicial de asociación
│   │   ├── ContactPage.jsx            # Formulario de contacto general
│   │   ├── CookiesPolicyPage.jsx      # Política de cookies legal
│   │   ├── DataProtectionPage.jsx     # Protección de datos (RGPD)
│   │   ├── FavoritesPage.jsx          # Listado de inmuebles favoritos
│   │   ├── HomePage.jsx               # Página de inicio y catálogo
│   │   ├── LegalNoticePage.jsx        # Aviso legal
│   │   └── PropertyDetailPage.jsx     # Página de detalle individual de propiedad
│   ├── services/               # Mock data y servicios de obtención de datos
│   │   ├── associationData.jsx        # Datos de configuración de asociaciones
│   │   └── propertiesData.jsx         # Catálogo de propiedades inmobiliarias
│   ├── styles/                 # Hojas de estilo CSS modulares
│   │   ├── header.css
│   │   ├── propertyCard.css
│   │   ├── propertyList.css
│   │   ├── propertyMap.css
│   │   └── ...
│   ├── utils/                  # Funciones de utilidad y helpers
│   │   └── recentlyViewedStorage.js   # Manejador del historial en sessionStorage
│   ├── App.css                 # Variables globales y estilos base
│   ├── App.jsx                 # Configuración de rutas principales
│   ├── i18n.js                 # Diccionarios de traducción (ES / EN)
│   └── main.jsx                # Punto de entrada de la aplicación React
├── index.html                  # Plantilla HTML base
├── metadata.json               # Metadatos del proyecto
├── package.json                # Definición de dependencias y scripts
├── vite.config.js              # Configuración de compilación con Vite
└── README.md                   # Documentación del proyecto
```

---

## 🚀 Requisitos Previos e Instalación

### Requisitos previos
- **Node.js**: Versión 18.0 o superior instalada. ([Descargar Node.js](https://nodejs.org/))
- **npm** (o gestores alternativos compatibles como `pnpm` o `bun`).

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/Sppgg/real-estate-mls-platform.git
cd real-estate-mls-platform
```

### Paso 2: Instalar las dependencias
```bash
npm install
```

### Paso 3: Iniciar el entorno de desarrollo
```bash
npm run dev
```

El servidor local se iniciará automáticamente. Puedes abrir tu navegador en:
```text
http://localhost:3000
```

---

## 📜 Scripts Disponibles

En el archivo `package.json` dispones de los siguientes comandos:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Vite en el puerto `3000`. |
| `npm run build` | Compila y optimiza la aplicación para producción en la carpeta `/dist`. |
| `npm run preview` | Previsualiza localmente la compilación de producción generada. |
| `npm run lint` | Ejecuta ESLint para analizar y validar la sintaxis y estilo del código fuente. |

---

## 📖 Guía de Uso para el Usuario

1. **Selección de Asociación**:
   - Al entrar en la raíz de la web (`/`), selecciona la asociación o red inmobiliaria que deseas explorar (por ejemplo, *Costa del Sol MLS*).
2. **Filtrar y Buscar Propiedades**:
   - Utiliza la barra superior de filtros para acotar los resultados según tus preferencias:
     - Haz clic en **Ubicación** para desplegar las ciudades y zonas disponibles. Puedes marcar múltiples zonas a la vez o buscar por texto.
     - Haz clic en **Tipo de vivienda** para seleccionar apartamentos, villas, áticos, etc.
     - Ajusta el rango de precio, dormitorios mínimos y baños.
     - Pulsa en **Más filtros** para filtrar por obra nueva o amenidades específicas (piscina, garaje, terraza, jardín).
     - Pulsa **Aplicar filtros** para actualizar el catálogo o **Limpiar filtros** para reiniciar la búsqueda.
3. **Alternar Vistas del Catálogo**:
   - En la cabecera del catálogo encontrarás el conmutador de vista:
     - 🔲 **Cuadrícula**: Presenta las propiedades en un grid de tarjetas con fotos grandes.
     - 📄 **Lista**: Dispone los inmuebles en filas horizontales compactas con información detallada.
     - 🗺️ **Mapa interactivo**: Explora geográficamente las propiedades en el mapa, haz clic en las chinchetas para ver la previsualización y navega por zonas destacadas.
4. **Ver Detalles Completos**:
   - Haz clic sobre cualquier tarjeta para abrir la ficha de detalle (en ventana modal o accediendo a la página dedicada).
   - Consulta la galería fotográfica, el plano de especificaciones técnicas, los impuestos (IBI, comunidad) y el mapa de localización aproximada.
   - En la parte inferior de la ficha encontrarás la sección **"Vistos recientemente"** con los últimos inmuebles que has visitado en tu sesión actual.
5. **Guardar en Favoritos**:
   - Haz clic en el botón con el corazón ❤️ en cualquier tarjeta o en la ficha de detalle para guardarla en tu lista personal.
   - Accede a la sección **Mis Favoritos** desde el menú superior para consultar todos los inmuebles guardados, incluso si cierras el navegador.
6. **Cambio de Idioma**:
   - En la esquina superior derecha del menú, haz clic en el selector de idioma para alternar entre **Español (ES)** e **English (EN)** en cualquier momento.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con ❤️ para **Real Estate MLS Platform**.
