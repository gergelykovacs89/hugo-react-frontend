import React from "react";
import AuthForm from "./AuthForm";

class Login extends React.Component {
  onSubmit = formValues => {
    console.log(formValues);
  };
  render() {
    return <AuthForm title="Login" onSubmit={this.onSubmit} />;
  }
}

export default Login;
