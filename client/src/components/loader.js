import React from 'react'
import loader from '../loader.gif'

export default () => {
  return (
    <div>
        <img
            src={loader}
            alt="Cargando..."
            style={{ width:'60px', margin:'40px auto', display: 'block'}}
        />
    </div>
  )
}
