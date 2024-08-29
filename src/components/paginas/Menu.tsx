import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../../firebase'
import { firebase_db } from '../../firebase/firebase'
import { onSnapshot, collection } from "firebase/firestore";
import { Platillo } from '../ui/Platillo';


export const Menu = () => {

  const { firebase } = useContext(FirebaseContext);
  const [todos_platos, setTodos_platos] = useState<any>([]);

  useEffect( () => {

    const obtenerMenu = () => {   

      const menu =  onSnapshot(collection(firebase_db, "productos"), manejarSnapshot);     
          
    }

    const manejarSnapshot = async(snapshot) => {

      try {
        
        const platillos = await snapshot.docs.map( doc => {
            return {
              id: doc.id,
              ...doc.data()
            }
        });
  
        setTodos_platos(platillos);

      } catch (error) {
        console.log(error);
        
      }

    }
       
    obtenerMenu();
  }, []);
  
 
  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Menu</h1>
      
        <Link to='/platillo' className='bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold'>
          Agregar al Menu
        </Link>

        {
          todos_platos.map( plato => (
            <Platillo 
              key={plato.id}
              plato={plato}
            />
          ))
        }

    </>
  )
}


