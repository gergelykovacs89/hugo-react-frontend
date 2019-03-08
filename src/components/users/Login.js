import React from "react";
import AuthForm from "./AuthForm";
import { loginRequest } from "../../actions";
import { connect } from "react-redux";

class Login extends React.Component {
  onSubmit = formValues => {
    this.props.loginRequest(formValues);
  };
  render() {
    return (
      <AuthForm
        title="Login"
        onSubmit={this.onSubmit}
        errors={this.props.errors}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginRequest }
)(Login);
