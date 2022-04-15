import React, { Component } from 'react'

export default class ClassState extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  // comprobacionError() {
  //   this.setState({
  //     error: !this.state.error
  //   })
  // }

  render() {
    return (
      <div>
        <p funcion={() =>  console.log(this.state.error) }></p>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escriba el código de seguridad.</p>
        {this.state.error && (<p>Codigo incorrecto</p>)}
        <input type='text' placeholder='código de seguridad'/>
        <button onClick={() => this.setState(prevState=> ({error: !prevState.error}))}>Comprobar</button>
      </div>
    )
  }
}