import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../../firebase/context';
import { doc, updateDoc } from 'firebase/firestore';
import { firebase_db } from '../../firebase/firebase';

export const Orden = ({orden}) => {

    const [ tiempo_entrega, setTiempoEntrega ] = useState(0);

    const { firebase } = useContext(FirebaseContext);

    const definirTiempo = async (id: string) => {
        
        try {

            const actualizar = doc(firebase_db, 'pedidos', id); // obtengo el documento a actualizar
            
            await updateDoc(actualizar, {
                tiempoEntrega: tiempo_entrega
            });
            
        } catch (error) {
            console.log(error)
        }
    }

    const completarOrden = async (id: string) => {
        
        try {

            const actualizar = doc(firebase_db, 'pedidos', id); 
            
            await updateDoc(actualizar, {
                completado: true
            });
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='sm:w-1/2 lg:w-1/3 px-2 mb-4'>
      <div className='p-3 shadow-md bg-white'>
            
            <h1 className='text-yellow-600 text-lg font-bold'>{orden.id}</h1>
            
            {
                orden.orden.map( plato => (
                    <p className='text-gray-600'>{plato.cantidad} {plato.nombre}</p>
                ))
            }

            <p className='text-gray-700 font-bold'>Total a Pagar: ${orden.total}</p>

            {
                orden.tiempoEntrega === 0 && (
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>Tiempo de entrega</label>

                        <input 
                            type="number"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
                            min='1'
                            max='20'
                            placeholder='20'
                            value={tiempo_entrega}
                            onChange={ e => setTiempoEntrega(parseInt(e.target.value))}
                        />

                        <button
                            onClick={() => definirTiempo(orden.id) }
                            type='submit'
                            className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
                        >
                            Definir tiempo
                        </button>
                    </div>
                )
            }

            {
                orden.tiempoEntrega > 0 && (
                    <p className='text-gray-700'>
                        Tiempo de Entrega:
                        <span className='font-bol'> {orden.tiempoEntrega} Minutos</span>
                    </p>
                )
            }
            {
                (!orden.completado && orden.tiempoEntrega > 0) && (
                    <button
                        type='button'
                        className='bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold'
                        onClick={ () => completarOrden(orden.id)}
                    >
                        Marcar como lista
                    </button>
                )
            }
      </div>
    </div>
  )
}


