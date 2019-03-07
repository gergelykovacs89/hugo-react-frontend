import React from "react";
import { reduxForm } from "redux-form";
import validate from "../../helpers/validate";
import AuthForm from "./AuthForm";

class Register extends React.Component {
  render() {
    return <AuthForm title="Register"/>;
  }
}


export default reduxForm({
  form: "Register",
  validate
})(Register);
