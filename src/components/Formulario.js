import React, { useState } from 'react';
import Error from './Error'

const Formulario = ({guardarBusqueda}) => {

    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const guardarImagenes = e => {
        e.preventDefault();

        //Validate 
        if(termino.trim() === ''){
            guardarError(true)
            return;
        }
        guardarError(false)

        guardarBusqueda(termino)
    }

    return (
        <form onSubmit={guardarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Buscar Imagen, EjemploL: futbol o animales"
                        onChange={e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-danger btn-lg btn-block"
                        value="buscar"
                    />
                </div>
            </div>
            { error ? <Error mensaje="Agrega un termino a tu busqueda" /> : null}
        </form>
    )
}

export default Formulario
