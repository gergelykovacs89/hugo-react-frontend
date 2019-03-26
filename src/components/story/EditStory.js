import React, { Fragment } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../actions";
import { updateStory } from "../../actions/story";
import { fetchText } from "../../actions/text";
import StoryForm from "./StoryForm";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import _ from "lodash";
import { CircularProgress } from "@material-ui/core";

class EditStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEditorStateWithText("") };
  }

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  componentDidMount() {
    this.props.fetchText(this.props.location.state.rootTextId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(nextProps.text.text))
        )
      });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onSubmit = formValues => {
    this.props.clearErrors();
    let contentState = this.state.editorState.getCurrentContent();
    formValues.text = JSON.stringify(convertToRaw(contentState));
    formValues.textId = this.props.location.state.rootTextId;
    this.props.updateStory(formValues, this.props.storyRoot._id);
  };

  circularProgress = (
    <Fragment>
      <CircularProgress color="inherit" />
    </Fragment>
  );

  render() {
    if (!this.props.text) {
      return this.circularProgress;
    }
    return (
      <Fragment>
        <StoryForm
          initialValues={_.pick(
            this.props.storyRoot,
            "title",
            "imgPath",
            "summary"
          )}
          title="Edit Story"
          onSubmit={this.onSubmit}
          editorState={this.state.editorState}
          onEditorChange={this.handleEditorChange}
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
    storyRoot: state.storyRoots[ownProps.match.params.id],
    text: state.texts[ownProps.location.state.rootTextId]
  };
};

export default connect(
  mapStateToProps,
  { clearErrors, updateStory, fetchText }
)(EditStory);
