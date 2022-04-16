import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = '123'

export default class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // estado compuesto: todos los estados estan contenidos en un objeto
      value: "",
      error: false,
      loading: false,
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log("UNSAFE_componentWillMount");
  // }

  // componentDidMount() {
  //   console.log("componentDidMount");
  // }

  componentDidUpdate() {
    console.log("Update");

    if(!!this.state.loading) {
      setTimeout(() => {
        console.log("Doing the validation");

     if(SECURITY_CODE === this.state.value) {
        this.setState({ loading: false, error: false });
     }else{
        this.setState({ loading: false, error: true });
     }

    // this.setState({ loading: false, error: SECURITY_CODE !== this.state.value }); // Estados complejos o compuestos: es la modficacion de 2 o más estados utilizando la siguiente sintaxis:

        console.log("Finishing the validation");
      }, 1000);
    }
  }

  render() {
    // const { error, loading, value } = this.state; otra forma de trabajar para no escribir this.state.estado

    return (
      <div>
        <h2>Delete {this.props.name}</h2>

        <p>Please enter the security code</p>

        {(this.state.error && !this.state.loading) && (
          <p>Error: Security code is incorrect</p>
        )}

        {this.state.loading && (
          <Loading />
        )}

        <input placeholder="Security Code"
        value={this.state.value}
        onChange={(e) => {
          this.setState({ value: e.target.value });
        }}
        />

        <button
          onClick={() => this.setState({ loading: true })}
        >Check</button>
      </div>
    );
  }
}


