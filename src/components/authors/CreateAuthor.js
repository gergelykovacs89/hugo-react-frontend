import React, { Fragment } from "react";
import AuthorForm from "./AuthorForm";
import { connect } from "react-redux";

class CreateAuthor extends React.Component {
  onSubmit = formValues => {
    console.log(formValues);
  };

  render() {
    return (
      <Fragment>
        <AuthorForm
          title="Create Author"
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
  {}
)(CreateAuthor);
