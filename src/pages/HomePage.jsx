import React from 'react'
import { CarouselHomeComponent } from '../components/CarouselHomeComponent'

//Importar hoja de estilos de la HomePage
import '../styles/HomePage.css';


export default function HomePage() {

  return (
    <div className="home-pag-container">
        <section className="carousel-section-home">
          <CarouselHomeComponent/>
        </section>

        {/*Otras secciones de Home*/}
        
    </div>
  )
}
