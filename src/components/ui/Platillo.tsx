import React, { useContext, useRef } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseContext } from '../../firebase';
import { firebase_db } from '../../firebase/firebase'

export const Platillo = ({plato}) => {

    // referencia al dom
    const existenciaRef = useRef(plato.existencia);
    const { firebase } = useContext(FirebaseContext);

    const { id, nombre, imagen, existencia, categoria, precio, descripcion } = plato;

    // actualizo disponibilidad en firebase
    const actualizarDisponibilidad = async () => {

        // cambio el valor disponible de string a boolean
        const existencia = (existenciaRef.current.value === 'true');
        
        try {

            const actualizar = doc(firebase_db, 'productos', id); // obtengo el documento a actualizar
            
            await updateDoc(actualizar, {
                existencia
            });
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-full px-3 mb-4'>
      <div className='p-5 shadow-md bg-white'>
        <div className='lg:flex'>

            <div className='lg:w-5/12 xl:w-3/12'>
               <img src={imagen} alt="Imagen menu" />
            
                <div className='sm:flex sm:-mx-2 pl-3'>
                    <label htmlFor="" className='block mt-5 sm:w-2/4'>
                        <span className='block text-gray-800 mb-2'>Existencia</span>

                        <select 
                            name="" 
                            id="" 
                            value={existencia}
                            ref={existenciaRef}
                            onChange={() => actualizarDisponibilidad()}
                            className='bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        >

                            <option value="true">Disponible</option>
                            <option value="false">No Disponible</option>
                        </select>
                    </label>
                </div>
            </div>  

            <div className='lg:w-7/12 xl:w-9/12 pl-5'>
                <p className='font-bold text-2xl text-yellow-600 mb-4'>
                    {nombre}
                </p>

                <p className='text-gray-600 mb-4'>
                    Categoria: {''}
                    <span className='text-gray-700 font-bold'>
                        {categoria.toUpperCase()}
                    </span>
                </p>

                <p className='text-gray-600 mb-4'>
                    {descripcion}                    
                </p>

                <p className='text-gray-600 mb-4'>
                    Precio: {''}
                    <span className='text-gray-700 font-bold'>
                       ${precio}
                    </span>
                </p>

            </div>            
        </div>
      </div>
    </div>
  )
}

 
