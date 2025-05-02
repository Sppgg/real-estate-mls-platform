import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// importación de componentes
import FooterComponent from "./components/FooterComponent";
import LegalNoticePage from "./pages/LegalNoticePage";
import CookiesPolicyPage from "./pages/CookiesPolicyPage";
import DataProtectionPage from "./pages/DataProtectionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/aviso-legal" element={<LegalNoticePage />} />
        <Route path="/politica-de-cookies" element={<CookiesPolicyPage />} />
        <Route path="/proteccion-de-datos" element={<DataProtectionPage />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
