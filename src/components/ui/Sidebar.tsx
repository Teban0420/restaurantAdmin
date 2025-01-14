// barra de navegacion
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {

  return (
    <div className='md:w2/5 xl:w-1/5 bg-gray-800'>
        <div className='p-6'>
            
            <p className='uppercase text-white text-xl tracking-wide text-center font-bold'>Restaurante</p>
            
            <p className='mt-3 text-gray-600'>
                Administra tu restaurante en las siguientes opciones:
            </p>

            <nav className='mt-10'>
                <NavLink 
                    className={ ({isActive}) => `nav-item nav-link ${isActive 
                                ? 'text-yellow-500' 
                                : 'p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900'}`
                            }                                   
                    to='/'
                >
                    Ordenes
                </NavLink>

                <NavLink 
                   className={ ({isActive}) => `nav-item nav-link ${isActive 
                    ? 'text-yellow-500' 
                    : 'p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900'}`
                    }           
                    to='/menu'
                >
                    Menu
                </NavLink>
            </nav>
        </div>      
    </div>
  )
}


