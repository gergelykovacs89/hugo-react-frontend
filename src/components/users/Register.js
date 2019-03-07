import React, { Fragment } from "react";
import AuthForm from "./AuthForm";
import { registerRequest, clearAlerts } from "../../actions";
import { connect } from "react-redux";
import history from "../../history";

class Register extends React.Component {
  onSubmit = formValues => {
    this.props.registerRequest(formValues);
  };

  renderAlerts() {
    const { error, message } = this.props;
    if (error) {
      alert(error);
      this.props.clearAlerts();
    } else if (message) {
      alert(message);
      this.props.clearAlerts();
      history.push("/");
    }
  }

  render() {
    return (
      <Fragment>
        <AuthForm title="Register" onSubmit={this.onSubmit} />
        {this.renderAlerts()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.user.error ? state.user.error : null,
    message: state.user.message ? state.user.message.message : null
  };
};

export default connect(
  mapStateToProps,
  { registerRequest, clearAlerts }
)(Register);
