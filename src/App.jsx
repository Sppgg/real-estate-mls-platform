//Importación React-Router-Dom
import { Routes, Route } from 'react-router-dom';

//importaciones Layout (puede ir en componentes)
import MainLayout from './components/layouts/MainLayout';

//importaciones pages


//importaciones components


//Estilado del App
import './App.css';

function App() {
  

  return (
    <Routes>
      {/*Lo de una asociacion bajo la misma ruta lo que no sea relacionado va en una router distinta */}
      <Route path='/association/:id' element={<MainLayout/>}>
        {/* <Route index element={<Home/>}/> */}
        {/* <Route path='properties' element={<Properties/>}/> */}
        {/* <Route path='properties/:propertId' element={<PropertyDetails/>}/> */}
        {/* <Route path='presentation' element={<PresentationAssociation/>}/> */}
      </Route>  

      {/* <Route path='*' element={<NotFound/>}/>   */}
    </Routes>
  )
}

export default App
