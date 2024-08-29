import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/context'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firebase_db } from '../../firebase/firebase';
import { Orden } from '../ui/Orden';

export const Ordenes = () => { 
  
  const { firebase } = useContext(FirebaseContext);
  const [ pedidos_pendientes, setPedidosPendientes ] = useState([]);

  useEffect( () => {

    const obtenerOrdenes = async () => {

        const consulta = query(collection(firebase_db, "pedidos"), where("completado", "==", false));
        const pedidos = await onSnapshot(consulta, manejarSnapshot);         
    }

    obtenerOrdenes();
  }, []);

  const manejarSnapshot = (pedido) => {

      const ordenes = pedido.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
      });

      setPedidosPendientes(ordenes);
  }
  
  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Ordenes</h1>

      <div className='sm:flex sm:flex-wrap -mx-3'>

        {
          pedidos_pendientes.map( orden => (
            <Orden 
                key={orden.id}
                orden={orden}
            />
          ))
        }
      </div>
    </> 
  )
}


