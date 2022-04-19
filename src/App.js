import React from 'react'
import UseState from './UseState'
import UseClass from './ClassState'
import { UseReducer } from './UseReducer'

function App() {
  return (
    <div className='App'>
      <UseReducer name="User Reducer" />
      {/* <UseState name="Use State" /> */}
      <UseClass name="Class State" />
    </div>
  )
}

export default App;
