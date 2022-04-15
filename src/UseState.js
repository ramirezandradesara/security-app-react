import React from 'react'

export default function UseState({ name }) {
  const [error, setError] = React.useState(false)

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escriba el código de seguridad.</p>
      {error && (
        <p>Código incorrecto</p>
      )}
      <input type='text' placeholder='código de seguridad' />
      <button
        onClick={()=> setError(!error)}>Comprobar</button>
    </div>
  )
}