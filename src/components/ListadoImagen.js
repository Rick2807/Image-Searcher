import React from 'react'
import PropTypes from 'prop-types'
import Imagen from './Imagen'

const ListadoImagen = ({imagenes}) => {
    return (
        <div className="col-12 p-5 row">
            {imagenes.map(imagen =>(
                <Imagen
                    key={imagen.id}
                    imagen={imagen}
                    />
            ))}
        </div>
    )
}

ListadoImagen.propTypes = {
    imagenes: PropTypes.object.isRequired
}

export default ListadoImagen
