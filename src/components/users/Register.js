import React, { Fragment } from "react";
import AuthForm from "./AuthForm";
import { registerRequest } from "../../actions";
import { connect } from "react-redux";

class Register extends React.Component {
  onSubmit = formValues => {
    this.props.registerRequest(formValues);
  };

  render() {
    return (
      <Fragment>
        <AuthForm
          title="Register"
          onSubmit={this.onSubmit}
          errors={this.props.errors}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    message: state.user.message
  };
};

export default connect(
  mapStateToProps,
  { registerRequest }
)(Register);
