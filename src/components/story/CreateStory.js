import React, { Fragment } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../actions";
import { createStory } from "../../actions/story";
import StoryForm from "./StoryForm";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { convertToRaw } from "draft-js";
class CreateStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEditorStateWithText("") };
  }
  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onSubmit = formValues => {
    this.props.clearErrors();
    let contentState = this.state.editorState.getCurrentContent();
    formValues.text = JSON.stringify(convertToRaw(contentState));
    this.props.createStory(formValues);
  };

  render() {
    return (
      <Fragment>
        <StoryForm
          title="Create Story"
          onSubmit={this.onSubmit}
          editorState={this.state.editorState}
          onEditorChange={this.handleEditorChange}
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
  { clearErrors, createStory }
)(CreateStory);
