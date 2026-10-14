import { useState, useEffect } from "react";


export default function useIsMobile() {

    /*Se quiere saber el tamaño de la ventana del navegador para 
    poder cambiar el diseño de la pág según esta.  */

    //Definir el estado para el tamaño de la pantalla
    //Evalua si el ancho de la ventana del navegador es menor o igual a 768px, si no se cumple setIsMobile será false.
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);


    //Función que actualiza el estado según el tamaño de la pantalla
    //Se ejecuta la función cada vez que se cambia el tamaño de la ventana
    const handleResize = () => {
        //se verifica el ancho de ventana y se actualiza el estado setIsMobile a true o false
        setIsMobile(window.innerWidth <= 768);
    };

    //Ejecuta el código cuando se monta el componente, se usa para agregar o quitar el addEvenListener
    //Usar el hook useEffect para escuchar un event listener al resize(evento en JavaScript que se dispara cuando el tamaño de la ventana del navegador cambia)
    useEffect(() => {

        //Agregar el event listener
        window.addEventListener('resize', handleResize);

        //Limpiar el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);


    return isMobile;
}
