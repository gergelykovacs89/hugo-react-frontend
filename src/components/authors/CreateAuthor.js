import React, { Fragment } from "react";
import AuthorForm from "./AuthorForm";
import { connect } from "react-redux";
import { addAuthor } from "../../actions";

class CreateAuthor extends React.Component {
  onSubmit = formValues => {
    this.props.addAuthor(formValues);
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
  { addAuthor }
)(CreateAuthor);
