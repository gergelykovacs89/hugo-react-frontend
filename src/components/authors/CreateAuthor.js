import React, { Fragment } from "react";
import AuthorForm from "./AuthorForm";
import { connect } from "react-redux";
import { addAuthor, clearErrors } from "../../actions";

class CreateAuthor extends React.Component {
  onSubmit = formValues => {
    this.props.addAuthor(formValues);
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

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
  { addAuthor, clearErrors }
)(CreateAuthor);
