//Importación React-Router-Dom
import { Routes, Route } from 'react-router-dom';

//importaciones proveedores
import { AllAssociationsProvider } from './context/AllAssociationsContext';

//importaciones Layout (puede ir en componentes)
import MainLayout from './components/layouts/MainLayout';

//importaciones pages
import AssociationSelector from './pages/AssociationSelector';

//importaciones components


//Estilado del App
import './App.css';

function App() {
  return (
    <AllAssociationsProvider>
      <Routes>

        <Route path="/" element={<AssociationSelector />} />

        {/*Lo de una asociacion bajo la misma ruta lo que no sea relacionado va en una router distinta */}
        <Route path='/association/:id' element={<MainLayout/>}>
          {/* <Route index element={<Home/>}/> */}
          {/* <Route path='properties' element={<Properties/>}/> */}
          {/* <Route path='properties/:propertId' element={<PropertyDetails/>}/> */}
          {/* <Route path='presentation' element={<PresentationAssociation/>}/> */}

          <Route path="/aviso-legal" element={<LegalNoticePage />} />
          <Route path="/politica-de-cookies" element={<CookiesPolicyPage />} />
          <Route path="/proteccion-de-datos" element={<DataProtectionPage />} />
          
        </Route>  

        {/* <Route path='*' element={<NotFound/>}/>   */}
        
      </Routes>

    </AllAssociationsProvider>
    
  )
}

export default App;
