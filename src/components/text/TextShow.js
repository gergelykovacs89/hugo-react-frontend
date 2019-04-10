import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import {
  Paper,
  CircularProgress,
  withStyles,
  Grid,
  Button
} from "@material-ui/core";
import { Edit, ShareOutlined } from "@material-ui/icons";
import CustomTextEditor from "../text/CustomTextEditor";
import { convertToRaw } from "draft-js";
import { fetchText, updateText } from "../../actions/text";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: "1vw",
    [theme.breakpoints.up("sm")]: {
      marginTop: "1vw",
      margin: "auto",
      width: "80vw"
    }
  }
});

class TextShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      readerState: EditorState.createEmpty(),
      editMode: false
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
      readerState: null
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
          <Button
            variant="contained"
            onClick={() =>
              this.setState({
                editMode: !this.state.editMode,
                editorState: this.state.readerState
              })
            }
          >
            <Edit />
          </Button>
        </Fragment>
      );
    }
  };

  renderForkButton = () => {
    return (
      <Fragment>
        <Button variant="contained" onClick={() => this.forkText(this.props.text._id)}>
          <ShareOutlined /> Fork it
        </Button>
      </Fragment>
    );
  };

  forkText = parentTextId => {
    console.log(parentTextId);
  };

  circularProgress = (
    <Fragment>
      <CircularProgress color="inherit" />
    </Fragment>
  );

  textRender = classes => (
    <Fragment>
      <Paper className={classes.paper}>
        <Grid
          justify="flex-start"
          container
          spacing={24}
          alignItems="flex-start"
        >
          <Grid item xs={12} md={2}>
            {this.renderEditButton(this.props.text)}
          </Grid>
          <Grid item xs={12} md={8}>
            <Editor
              editorState={this.state.readerState}
              onChange={this.handleEditorChange}
              readOnly={true}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            {this.renderForkButton()}
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );

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
            <Button
              variant="contained"
              onClick={() =>
                this.setState({
                  editMode: !this.state.editMode,
                  editorState: this.state.readerState
                })
              }
            >
              cancel
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <CustomTextEditor
              editorState={this.state.editorState}
              onEditorChange={this.handleEditorChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant="contained" onClick={this.handleSave}>
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
    const { classes } = this.props;
    return (
      <Fragment>
        {this.state.editMode
          ? this.editRender(classes)
          : this.textRender(classes)}
      </Fragment>
    );
  }
}

const textShowWithStyles = withStyles(styles)(TextShow);

const mapStateToProps = (state, ownProps) => {
  return {
    text: state.navigation.currentlyVisitedStoryRootTexts[ownProps.textId],
    selfAuthorId: state.user.authorId
  };
};

export default connect(
  mapStateToProps,
  { fetchText, updateText }
)(textShowWithStyles);
