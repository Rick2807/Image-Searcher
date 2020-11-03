import React, { useState, useEffect } from 'react'
import Formulario from './components/Formulario'
import ListadoImagen from './components/ListadoImagen'

function App() {

  const [busqueda, guardarBusqueda] = useState('') 
  const [imagenes, guardarImagenes] = useState([])
  const [paginaActual, guardarPaginaActual] = useState(1)
  const [totalPaginas, guardarTotalPaginas] = useState(1)

  useEffect(() =>{
    const consultarApi = async () => {
        // avoid submitting after doc load
        if(busqueda === '') return;

        const imagenesPorPagina = 30 
        const key = "18003818-58b6ff80c0e8821068f8211a0"
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

        const respuesta = await fetch(url)
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits)

        //calculate total number of pages 
        const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
        guardarTotalPaginas(calcularTotalPaginas)

        //Mover la pantalla hacia arriba 
        const jumbotron = document.querySelector('.jumbotron');
        jumbotron.scrollIntoView({behavior: 'smooth'})
    }

    consultarApi()

  },[busqueda,paginaActual])

  //Create Previous Page
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1
    if(nuevaPaginaActual === 0 ) return 

    guardarPaginaActual(nuevaPaginaActual)
  }

  // Create Next Page
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1
    if(nuevaPaginaActual > totalPaginas ) return 

    guardarPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">

        <ListadoImagen 
          imagenes={imagenes}
         />
         {
            (paginaActual === 1) ? null : <button 
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
              >&laquo; Anterior</button>
         }

        
          {(paginaActual === totalPaginas ? null : (
            <button 
            type="button"
            className="bbtn btn-info"
            onClick={paginaSiguiente}
            > Siguiente&raquo;</button>
          ))}
      </div>
    </div>
  );
}

export default App;
