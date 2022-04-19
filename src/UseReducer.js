const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
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
    }else{
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

// Reducer como objeto, la favorita del profe. Dividimos por una parte la funcion reducer y por otra el objeto

const reducerObject = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) { // pregunta si el action type existe dentro del objeto
        return reducerObject(state)[action.type]; // devolvemos el objeto que se llama igual a nuestro action.type por ej.: ERROR
    }else{
        return state; // sino encuentra devuelve el mismo estado q nos entregaron
    }
}