import { createContext, useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom';

//creamos el contexto 
const AssociationContext = createContext();

//Creamos el provider 

export function AssociationProvider({children}){
    //id de la url 
    const {id} = useParams();
    //almacenamos los datos que traemos de la data associationData
    const [association, setAssociation] = useState(null);

    //llamada fake
    useEffect(() => {
        const data = GetAllAssoc(); //devuelve el arrayd de assoc
        const foundAssociation = data.find((item) => item._id === id);
        setAssociation(foundAssociation);//solo guarda la assoc que coincide con la URL
    }, [id]);

    if(!association) return <p>Comprueba la asociación</p>

    return(
        <AssociationContext.Provider value={association}>
            {children}
        </AssociationContext.Provider>

    );
}

//Se crea una función para evitar usar el useContext en otros componentes
export function useAssociation(){
    return useContext(AssociationContext);
}