//Importación React-Router-Dom
import { Routes, Route, Navigate } from "react-router-dom";

//importaciones proveedores
import { AllAssociationsProvider } from "./context/AllAssociationsContext";

//importaciones Layout (puede ir en componentes)
import MainLayout from "./components/layouts/MainLayout";

//importaciones pages
import HomePage from './pages/HomePage';
import AssociationSelectorPage from './pages/AssociationSelectorPage';
import LegalNoticePage from "./pages/LegalNoticePage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import DataProtectionPage from "./pages/DataProtectionPage";

//importaciones components

//Estilado del App
import "./App.css";

function App() {
  return (
    <AllAssociationsProvider>
      <Routes>

        <Route path="/" element={<AssociationSelectorPage/>} />

        {/*Lo de una asociacion bajo la misma ruta lo que no sea relacionado va en una router distinta */}
        <Route path='/association/:id' element={<MainLayout/>}>
          <Route index element={<HomePage/>}/>
          {/* <Route path='properties' element={<PropertiesFilter/>}/> */}
          {/* <Route path='properties/:propertId' element={<PropertyDetails/>}/> */}
          {/* <Route path='presentation' element={<PresentationAssociation/>}/> */}

          <Route path="aviso-legal" element={<LegalNoticePage />} />
          <Route path="politica-de-cookies" element={<CookiesPolicyPage />} />
          <Route path="proteccion-de-datos" element={<DataProtectionPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AllAssociationsProvider>
  );
}

export default App;
