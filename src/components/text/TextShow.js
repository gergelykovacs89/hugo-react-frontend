import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import {
  Paper,
  CircularProgress,
  withStyles,
  Grid,
  Button,
  IconButton
} from "@material-ui/core";
import { Edit, ShareOutlined, SettingsBackupRestore } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import CustomTextEditor from "../text/CustomTextEditor";
import { convertToRaw } from "draft-js";
import {
  fetchText,
  updateText,
  forkText,
  deleteTextById,
  unLoadTextFromStoryWriter
} from "../../actions/text";
import AuthorDetailByText from "../authors/AuthorDetailByText";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: "1vw",
    [theme.breakpoints.up("sm")]: {
      marginTop: "1vw",
      margin: "auto",
      width: "80vw"
    }
  },
  editButton: {
    color: "black",
    backgroundColor: "#ffd11a",
    "&:hover": {
      backgroundColor: "#e6b800"
    },
    marginRight: "1vw"
  },
  backButton: {
    color: "black",
    backgroundColor: "#ed2828",
    "&:hover": {
      backgroundColor: "#990101"
    },
    marginRight: "1vw"
  },
  cancelButton: {
    marginRight: "1vw"
  },
  forkButton: {
    backgroundColor: "#0aaf0a",
    "&:hover": {
      backgroundColor: "#017701"
    },
    marginRight: "1vw"
  },
  saveButton: {},
  iconSmall: {
    fontSize: 20
  }
});

class TextShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      readerState: EditorState.createEmpty(),
      editMode: props.editMode,
      isFull: props.isFull,
      deleting: false
    };
  }

  componentDidMount() {
    this.props.fetchText(this.props.textId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({
        readerState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(nextProps.text.text))
        )
      });
    }
  }

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  handleSave = () => {
    this.setState({
      editMode: !this.state.editMode,
      readerState: null,
      isFull: false
    });
    let contentState = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    this.props.updateText(contentState, this.props.textId);
  };

  renderEditButton = text => {
    if (this.props.selfAuthorId === text._authorId._id) {
      return (
        <Grid item>
          <IconButton
            className={this.props.classes.editButton}
            variant="contained"
            onClick={() =>
              this.setState({
                editMode: !this.state.editMode,
                editorState: this.state.readerState
              })
            }
          >
            <Edit />
          </IconButton>
        </Grid>
      );
    }
  };

  renderBackButton = () => {
    return (
      <Grid item>
        <IconButton
          className={this.props.classes.backButton}
          variant="contained"
          onClick={() => this.onBack()}
        >
          <SettingsBackupRestore />
        </IconButton>
      </Grid>
    );
  };

  renderForkButton = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          className={this.props.classes.forkButton}
          onClick={() => this.forkText(this.props.text._id)}
        >
          <ShareOutlined /> Fork it
        </Button>
      </Grid>
    );
  };

  forkText = parentTextId => {
    let text = JSON.stringify(
      convertToRaw(EditorState.createEmpty().getCurrentContent())
    );
    this.props.forkText(text, parentTextId, this.props.selfAuthorId);
  };

  circularProgress = (
    <Fragment>
      <CircularProgress color="inherit" />
    </Fragment>
  );

  renderBrowseButton = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          onClick={() => this.onBrowseForks(this.props.textId)}
        >
          Browse forks
        </Button>
      </Grid>
    );
  };

  textRender = classes => (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid
          justify="space-around"
          container
          spacing={24}
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Grid
              justify="space-between"
              container
              spacing={24}
              alignItems="flex-start"
            >
              <Grid item>
                <AuthorDetailByText
                  author={this.props.text._authorId}
                  noName={true}
                />
              </Grid>
              {this.renderEditButton(this.props.text)}
              {this.props.isLast && !this.props.isRootText
                ? this.renderBackButton()
                : null}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Editor
              editorState={this.state.readerState}
              onChange={this.handleEditorChange}
              readOnly={true}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              justify="space-between"
              container
              spacing={24}
              alignItems="flex-start"
            >
              {this.props.isLast ? this.renderBrowseButton() : null}
              {this.props.isLast ? this.renderForkButton() : null}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );

  onBrowseForks = textId => {
    this.props.handleBrowseForks(textId);
  };

  onCancel = () => {
    if (this.state.isFull) {
      this.setState({ deleting: true });
      this.props.deleteTextById(
        this.props.text._id,
        this.props.text._parentTextId
      );
    }
    this.setState({
      editMode: !this.state.editMode,
      editorState: this.state.readerState
    });
  };

  onBack = () => {
    this.props.unLoadTextFromStoryWriter(
      this.props.text._id,
      this.props.text._parentTextId
    );
  };

  editRender = classes => (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid
          justify="flex-start"
          container
          spacing={24}
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <CustomTextEditor
              editorState={this.state.editorState}
              onEditorChange={this.handleEditorChange}
              isFull={this.state.isFull}
              autofocus={this.state.isFull}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid
              justify="space-between"
              container
              spacing={24}
              alignItems="flex-start"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.onCancel}
                  className={classes.cancelButton}
                >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={this.handleSave}
                  className={classes.saveButton}
                >
                  <SaveIcon className={classes.iconSmall} />
                  save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );

  render() {
    if (!this.props.text || !this.state.readerState || this.state.deleting) {
      return this.circularProgress;
    }
    const { classes, isFull } = this.props;
    return (
      <Fragment>
        {this.state.editMode
          ? this.editRender(classes, isFull)
          : this.textRender(classes)}
      </Fragment>
    );
  }
}

const textShowWithStyles = withStyles(styles)(TextShow);

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.navigation.currentlyVisitedStoryRootTexts[ownProps.textId],
    selfAuthorId: state.user.authorId,
    isLast: state.navigation.currentLastTextIdOfStory === ownProps.textId,
    isRootText:
      state.navigation.currentlyVisitedStoryRootDetail._rootTextId ===
      ownProps.textId
  };
};

export default connect(
  mapStateToProps,
  { fetchText, updateText, forkText, deleteTextById, unLoadTextFromStoryWriter }
)(textShowWithStyles);
