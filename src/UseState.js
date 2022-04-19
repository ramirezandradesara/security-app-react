import React, { useEffect } from 'react'

const SECURITY_CODE = '123'

export default function UseState({ name }) {
  // estaods independientes o siples: tenemos un actualizador por cada uno, a diferencia de class components
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  // estado compuesto o complejos
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  })

  console.log(state);

  // código declarativo
  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true
    });
  }

  const onError = () => {
    setState({ 
      ...state, 
      loading: false, 
      error: true });
  }

  const onWrite = (newValue) => {
    setState({ ...state, value: newValue })
  }

  const onDelete = () => {
    setState({ 
      ...state, 
      deleted: true,  })
  }

  const onCheck = () => {
    setState({ ...state, loading: true })
    // setTimeout(() => {
    //   if (value === SECURITY_CODE) {
    //     onConfirm();
    //   } else {
    //     onError();
    //   }
    // }, 2000);
  }

  const onReset = () => {
    setState({ 
      ...state, 
      confirmed: false,
      deleted: false, 
      value: '',
    })
  }

  React.useEffect(() => {
    console.log("Starting the effect");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Doing the validation");

        if (state.value === SECURITY_CODE) {
            onConfirm();

          // setState({   // en lugar de pasar el objeto completo, pasamos la función onConfirm
          //   ...state,
          //   loading: false,
          //   error: false,
          //   confirmed: true
          // }); 
          // en estados compuestos no basta modificar una de sus entradas, debemos crear una nueva coleccion y hacer que nuestro estado apunte a ella 
          // setLoading(false);
          // setError(false);

        } else {
          onError();
          // setState({ ...state, loading: false, error: true });
          // setError(true);
          // setLoading(false);
        }


        console.log("Finishing the validation");
      }, 1000);
    }

    console.log("Finishing the effect");
  }, [state.loading]);


  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escriba el código de seguridad.</p>

        {(state.error && !state.loading) && (
          <p>Código incorrecto</p>
        )}

        {state.loading && (<p>Cargando...</p>)}

        <input
          type='text'
          placeholder='código de seguridad'
          value={state.value}
          onChange={(e) => {
            // setError(false) siempre estamos llamando al estado, lo que renderiza innecesariamente
            // setValue(e.target.value)
            // setState({ ...state, value: e.target.value })
            onWrite(e.target.value)
          }}
        />

        <button
          onClick={() =>
            onCheck()
            //setState({ ...state, loading: true })
            // setLoading(true)
            // setError(false);} siempre muestra el cartelito, desaparece cuadno es correcto el codigo
          }>Comprobar</button>
      </div>
    )
  } else if (state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>¿Estas segurx de elimnar?</p>
        <button
         onClick={() => onDelete()}> Sí, eliminar</button>
        {/* onClick={() => setState({ ...state, deleted: true,  })} */}
         
       
        <button
          onClick={() => onReset()}
        >Nop, me arrenpentí</button>
      </React.Fragment>

    )
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con éxito</p>
        <button
          onClick={() => onReset()}
        >Recuperar useState</button>
      </React.Fragment>
    )
  }
}