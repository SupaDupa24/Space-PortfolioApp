import React from 'react'
import loader2 from '../loader2.gif'

export default () => {
  return (
    <div>
        <img
            src={loader2}
            alt="Cargando..."
            style={{ width:'128px', margin:'10px auto', display: 'block'}}
        />
    </div>
  )
}
