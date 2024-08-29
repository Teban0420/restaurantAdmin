import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { FirebaseContext } from '../../firebase'
import { firebase_db, storage } from '../../firebase/firebase'



export const Platillo = () => {

  const { firebase } = useContext(FirebaseContext);
  const [ subiendo, guardarSubiendo ] = useState(false);  
  const [ urlImagen, guardarUrlImagen] = useState('');

  const navigate = useNavigate();  
 
  // validación y leer datos del formulario  
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
      existencia: false
    },
    validationSchema: Yup.object({
        nombre: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required('El nombre es obligatorio'),
        precio: Yup.number().min(1, 'El precio debe ser un numero').required('El precio es obligatorio'),
        categoria: Yup.string().required('La categoria es obligatoria'),
        descripcion: Yup.string().min(10, 'La descripcion debe contener mas de 10 caracteres').required('La descripción es obligatoria'),
    }),
    onSubmit: async datos => {
        // envio datos a firebase
        try {

          datos.existencia = true;
          datos.imagen = urlImagen;
          const new_plato = doc(collection(firebase_db, 'productos/'));
          const resp = await setDoc(new_plato, datos);

          navigate('/menu');

        } catch (error) {
          console.log(error)
        }
    }

  });

  // funciones para subir las imagenes
  
  const handleChange = async (e) => {

    if (e.target.files[0]) {

      const name = e.target.files[0].name.split('.');
      const new_name = uuidv4().toLowerCase(); 
                 
      const storageRef = ref(storage, `productos/${new_name.concat('.', name[1])}`); 
      guardarSubiendo(true);

      await uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
            
          getDownloadURL(storageRef).then((url) => {

            guardarUrlImagen(url);
            guardarSubiendo(false);
           
          }).catch((error) => {
            console.log(error)
          });
      });
      
    }
    
  }  

  return (
    <>
      <h1 className='text-3xl font-light mb-4'>Agregar Al Menu</h1>

      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-3xl'>
           
            <form onSubmit={formik.handleSubmit}>

                <div className='mb-4'>
                    <label 
                      htmlFor="nombre"
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Nombre
                    </label>
                    <input
                       type="text" 
                       id='nombre'
                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                       placeholder='Nombre del plato'
                       value={formik.values.nombre}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                    />
                </div>

                {formik.touched.nombre && formik.errors.nombre ? (
                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                      <p className='font-bold'>{formik.errors.nombre}</p>
                    </div>
                ) : null}

                <div className='mb-4'>
                    <label 
                      htmlFor="nombre"
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Precio
                    </label>
                    <input
                       type="number" 
                       id='precio'
                       min={0}
                       value={formik.values.precio}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                       placeholder='Precio del plato'
                    />
                </div>

                {formik.touched.precio && formik.errors.precio ? (
                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                      <p className='font-bold'>{formik.errors.precio}</p>
                    </div>
                ) : null}

                <div className='mb-4'>
                    <label 
                      htmlFor="categoria"
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Categoria
                    </label>

                    <select 
                      name="categoria" 
                      id="categoria"
                      value={formik.values.categoria}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    >
                      <option value="">Seleccione</option>
                      <option value="desayuno">Desayuno</option>
                      <option value="comida">Comida</option>
                      <option value="cena">Cena</option>
                      <option value="bebida">Bebida</option>
                      <option value="postre">Postre</option>
                      <option value="ensalada">Ensalada</option>

                    </select>
                    
                </div>

                {formik.touched.categoria && formik.errors.categoria ? (
                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                      <p className='font-bold'>{formik.errors.categoria}</p>
                    </div>
                ) : null}

                <div className='mb-4'>
                    <label 
                      htmlFor="imagen"
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Imagen
                    </label>
                   
                    <input 
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id="imagen"
                      type="file"
                      onChange={handleChange}
                      accept="image/*"
                    />
                </div>

                {
                  subiendo && (  
                    <div className="text-center">                 
                      <div role="status">
                        <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div> 
                  )
                }

                {
                  urlImagen && (
                    <p className='bg-green-500 text-white p-3 text-center my-5'>
                      La imagen se subio correctamente
                    </p>
                  )
                }

                <div className='mb-4'>
                    <label 
                      htmlFor="descripcion"
                      className='block text-gray-700 text-sm font-bold mb-2'
                    >
                      Descripción
                    </label>
                    <textarea                       
                       id='descripcion'   
                       value={formik.values.descripcion}
                       onChange={formik.handleChange}   
                       onBlur={formik.handleBlur}                
                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40'
                       placeholder='Agrega alguna descripción'
                    >
                      </textarea>
                </div>

                {formik.touched.descripcion && formik.errors.descripcion ? (
                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5' role='alert'>
                      <p className='font-bold'>{formik.errors.descripcion}</p>
                    </div>
                ) : null}

                <input 
                  type='submit'
                  className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold'
                  value='Enviar'
                />
            </form>
        </div>
      </div>
    </>
  )
}


