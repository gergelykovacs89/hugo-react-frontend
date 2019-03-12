import React, { Fragment } from "react";
import AuthorForm from "./AuthorForm";
import { fetchAuthor } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";

class EditAuthor extends React.Component {
  componentDidMount() {
    this.props.fetchAuthor(this.props.match.params.id);
  }

  onSubmit = formValues => {};

  render() {
    return (
      <Fragment>
        <AuthorForm
          initialValues={_.pick(
            this.props.author,
            "name",
            "imgPath",
            "description"
          )}
          title="Edit Author"
          onSubmit={this.onSubmit}
          errors={this.props.errors}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors,
    message: state.user.message,
    author: state.authors[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchAuthor }
)(EditAuthor);
