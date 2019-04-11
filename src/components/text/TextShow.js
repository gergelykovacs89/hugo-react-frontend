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
import { Edit, ShareOutlined } from "@material-ui/icons";
import SaveIcon from "@material-ui/icons/Save";
import CustomTextEditor from "../text/CustomTextEditor";
import { convertToRaw } from "draft-js";
import {
  fetchText,
  updateText,
  forkText,
  deleteTextById
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
    marginRight: "1vw",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "1vw"
    }
  },
  cancelButton: {
    marginRight: "1vw",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "1vw"
    }
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
      isFull: props.isFull
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
    if (this.props.selfAuthorId === text._authorId) {
      return (
        <Fragment>
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
        </Fragment>
      );
    }
  };

  renderForkButton = () => {
    return (
      <Fragment>
        <Button
          variant="contained"
          onClick={() => this.forkText(this.props.text._id)}
        >
          <ShareOutlined /> Fork it
        </Button>
      </Fragment>
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
      <Button
        variant="contained"
        onClick={() => this.onBrowseForks(this.props.textId)}
      >
        Browse forks
      </Button>
    );
  };

  textRender = classes => (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid
          justify="space-around"
          container
          spacing={24}
          alignItems="flex-start"
        >
          <Grid item xs={12} md={2}>
            <AuthorDetailByText author={this.props.text.author} noName={true} />
            {this.props.isLast ? this.renderBrowseButton() : null}
          </Grid>
          <Grid item xs={12} md={8}>
            <Editor
              editorState={this.state.readerState}
              onChange={this.handleEditorChange}
              readOnly={true}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            {this.renderEditButton(this.props.text)}
            {this.props.isLast ? this.renderForkButton() : null}
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

  editRender = classes => (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid
          justify="flex-start"
          container
          spacing={24}
          alignItems="flex-start"
        >
          <Grid item xs={12} md={2}>
            {/* TODO nextTextLoading??? */}
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomTextEditor
              editorState={this.state.editorState}
              onEditorChange={this.handleEditorChange}
              isFull={this.state.isFull}
              autofocus={this.state.isFull}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.onCancel}
              className={classes.cancelButton}
            >
              cancel
            </Button>
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
      </Paper>
    </Fragment>
  );

  render() {
    if (!this.props.text || !this.state.readerState) {
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
    isLast: state.navigation.currentLastTextIdOfStory === ownProps.textId
  };
};

export default connect(
  mapStateToProps,
  { fetchText, updateText, forkText, deleteTextById }
)(textShowWithStyles);
