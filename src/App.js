import React from 'react'
import UseState from './UseState'
import UseClass from './ClassState'

function App() {
  return (
    <div className='App'>
      <UseState name="Use State" />
      <UseClass name="Class State" />
    </div>
  )
}

export default App;
