import React, { useEffect } from 'react'

const SECURITY_CODE = '123'

export default function UseState({ name }) {
  // llamamos independientes a los estados porque tenemos un actualizador por cada uno, a diferencia de class components
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  console.log(value);

  React.useEffect(() => {
    console.log("Starting the effect");

    if (!!loading) {
      setTimeout(() => {
        console.log("Doing the validation");

        //value === SECURITY_CODE ? setError(false) : setError(true)
   
        if(value === SECURITY_CODE) {
          setLoading(false);
          setError(false);
          
        }else{
          setError(true);
          setLoading(false);
        }


        console.log("Finishing the validation");
      }, 1000);
    }

    console.log("Finishing the effect");
  }, [loading]);



  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Por favor, escriba el código de seguridad.</p>

      {(error && !loading) && (
        <p>Código incorrecto</p>
      )}

      {loading && (<p>Cargando...</p>)}
      <input
        type='text'
        placeholder='código de seguridad' 
        value={value}
        onChange={(e) => {
          // setError(false) siempre estamos llamando al estado, lo que renderiza innecesariamente
          setValue(e.target.value)
        }}
        />
      <button
        onClick={() => 
          setLoading(true)
         // setError(false);} siempre muestra el cartelito, desaparece cuadno es correcto el codigo
        }>Comprobar</button>
    </div>
  )
}