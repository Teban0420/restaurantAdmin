import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Ordenes } from './components/paginas/Ordenes'
import { Platillo } from './components/paginas/Platillo'
import { Menu } from './components/paginas/Menu'
import { Sidebar } from './components/ui/Sidebar'
import { firebase } from './firebase/firebase'
import { FirebaseContext } from './firebase/context'


function App() {
  const [count, setCount] = useState(0)

  return (

    <FirebaseContext.Provider
        value={{firebase}}
    >

      <div className='md:flex min-h-screen'>   

        <Sidebar />

        <div className='md:w-3/5 xl:w-4/5 p-6'>

          <Routes>
            <Route path='/' Component={Ordenes} />
            <Route path='/platillo' Component={Platillo} />
            <Route path='/menu' Component={Menu} />        
          </Routes>  

        </div>      
      </div>

    </FirebaseContext.Provider>
  )
}

export default App
