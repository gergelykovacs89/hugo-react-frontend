import React from "react";
import { reduxForm } from "redux-form";
import validate from "../../helpers/validate";
import AuthForm from "./AuthForm";

class Login extends React.Component {
  render() {
    return <AuthForm title="Login"/>;
  }
}


export default reduxForm({
  form: "Login",
  validate
})(Login);