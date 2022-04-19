import React, { useEffect } from 'react'

const SECURITY_CODE = '123'

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

// Reducer como objeto, la favorita del profe. Dividimos por una parte la funcion reducer y por otra el objeto
const reducerObject = (state, payload) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'CONFIRM': {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    'WRITE': {
        ...state,
        value: payload,
        error: false,
        loading: false,
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
        ...state,
        deleted: false,
        confirmed: false,
        value: '',
    },
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) { // pregunta si el action type existe dentro del objeto
        return reducerObject(state, action.payload)[action.type]; // devolvemos el objeto que se llama igual a nuestro action.type por ej.: ERROR
    } else {
        return state; // sino encuentra devuelve el mismo estado q nos entregaron
    }
}

function UseReducer({ name }) {

    const [state, dispatch] = React.useReducer(reducer, initialState) // useReducer tiene dos paramaetros, el reducer y el estado inicial con el que vamos a trabajar
    // en lguar de initialState, podriamos pasarle un objeto con todos los estados

    React.useEffect(() => {
        console.log("Starting the effect");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("Doing the validation");

                if (state.value === SECURITY_CODE) {
                    dispatch({ type: 'CONFIRM' });
                    
                    //onConfirm();
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
                    dispatch({ type: 'ERROR' });
                    
                    // onError();
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
                        //onWrite(e.target.value)
                        dispatch({ type: 'WRITE', payload: e.target.value }) // si fuese más d 1 payload mandamos un objeto
                    }}
                />

                <button
                    onClick={() =>
                        dispatch({ type: 'CHECK' })
                        //onCheck()
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
                    onClick={() => dispatch({ type: 'DELETE' })}> Sí, eliminar</button>
                {/* onClick={() => onDelete()}> Sí, eliminar</button> */}
                {/* onClick={() => setState({ ...state, deleted: true,  })} */}


                <button
                    onClick={() => dispatch({ type: 'RESET' })}>Nop, me arrenpentí</button>
                {/* onClick={() => onReset()} */}
            </React.Fragment>

        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => dispatch({ type: 'RESET' })} >Recuperar useState</button>
                {/* onClick={() => onReset()} */}

            </React.Fragment>
        )
    }


    // Reducer con condicionales if else

    const reducerIf = (state, action) => {
        if (action.type === 'ERROR') {
            return {
                ...state,
                loading: false,
                error: true,
                deleted: false,
                confirmed: false,
            }
        } else if (action.type === 'WRITE') {
            return {
                ...state,
                value: action.payload,
                error: false,
                loading: false,
                deleted: false,
                confirmed: false,
            }
        } else {
            return {
                ...initialState
            }
        }
    }

    // Reducer con Switch, la más popular

    const reducerSwitch = (state, action) => {
        switch (action.type) {
            case 'WRITE':
                return {
                    ...state,
                    value: action.payload,
                    error: false,
                    loading: false,
                    deleted: false,
                    confirmed: false,
                }
            case 'CHECK':
                return {
                    ...state,
                    loading: true,
                    error: false,
                    deleted: false,
                    confirmed: false,
                }
            case 'CONFIRM':
                return {
                    ...state,
                    loading: false,
                    error: false,
                    deleted: false,
                    confirmed: true,
                }
            case 'ERROR':
                return {
                    ...state,
                    loading: false,
                    error: true,
                    deleted: false,
                    confirmed: false,
                }
            case 'DELETE':
                return {
                    ...state,
                    loading: false,
                    error: false,
                    deleted: true,
                    confirmed: false,
                }
            case 'RESET':
                return {
                    ...state,
                    loading: false,
                    error: false,
                    deleted: false,
                    confirmed: false,
                    value: '',
                }
            default:
                return {
                    ...state
                }

        }
    }

}

export { UseReducer }