// Importación React-Router-Dom
import { Routes, Route, Navigate } from "react-router-dom";

// Proveedores
import { AllAssociationsProvider } from "./context/AllAssociationsContext";
import { FavoritesProvider } from "./context/FavoritesContext";

// Layout
import MainLayout from "./components/layouts/MainLayout";

// Páginas
import HomePage from "./pages/HomePage";
import AssociationSelectorPage from "./pages/AssociationSelectorPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import DataProtectionPage from "./pages/DataProtectionPage";

// Estilado general
import "./App.css";

function App() {
  return (
    <AllAssociationsProvider>
      <FavoritesProvider>
        <Routes>
          {/* Selector inicial de asociación */}
          <Route path="/" element={<AssociationSelectorPage />} />

          {/* Portal de la asociación activa */}
          <Route path="/association/:id" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="properties" element={<HomePage scrollToCatalog={true} />} />
            <Route path="propiedades" element={<HomePage scrollToCatalog={true} />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="presentation" element={<AboutUsPage />} />
            <Route path="about" element={<AboutUsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="contacto" element={<ContactPage />} />
            <Route path="properties/:propertyId" element={<PropertyDetailPage />} />

            <Route path="aviso-legal" element={<LegalNoticePage />} />
            <Route path="politica-de-cookies" element={<CookiesPolicyPage />} />
            <Route path="proteccion-de-datos" element={<DataProtectionPage />} />
          </Route>

          {/* Fallback de rutas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </FavoritesProvider>
    </AllAssociationsProvider>
  );
}

export default App;
