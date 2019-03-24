import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { getStoryRoot, unSetStoryRoot } from "../../actions/story";
import { unSetAuthor } from "../../actions";
import HeaderAvatar from "../layouts/HeaderAvatar";
import {
  Paper,
  CircularProgress,
  withStyles,
  Grid,
  Typography
} from "@material-ui/core";
import {
  RemoveRedEye,
  ThumbUpOutlined,
  ShareOutlined
} from "@material-ui/icons";
import CustomTextEditor from "../text/CustomTextEditor";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    marginTop: "1vw",
    [theme.breakpoints.up("sm")]: {
      marginTop: "1vw",
      margin: "auto",
      width: "80vw"
    }
  },
  avatar: {
    minHeight: "100px",
    minWidth: "100px",
    height: "100%",
    width: "100%"
  },
  title: {
    textAlign: "justify",
    fontFamily: "Oswald",
    wordBreak: "break-word",
    lineHeight: "1.25",
    letterSpacing: "0",
    fontSize: "30px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "45px"
    }
  }
});

class StoryWriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }
  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  componentDidMount() {
    this.props.getStoryRoot(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getStoryRoot(nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.unSetStoryRoot();
    this.props.unSetAuthor();
  }

  onFollow = () => {
    this.props.followgetStoryRoot();
  };

  onUnFollow = () => {
    this.props.unFollowStoryRoot();
  };

  circularProgress = (
    <Fragment>
      <CircularProgress color="inherit" />
    </Fragment>
  );

  renderButtons() {}

  render() {
    if (!this.props.storyRoot || !this.props.author) {
      return this.circularProgress;
    }
    const { storyRoot, classes, author } = this.props;
    const contentState = convertFromRaw(JSON.parse(storyRoot.text.text));
    const editorState = EditorState.createWithContent(contentState);
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid justify="center" container spacing={24} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" className={classes.title}>
                {storyRoot.title}
              </Typography>
            </Grid>
            <Grid item xs={8} md={6}>
              <img
                src={storyRoot.imgPath}
                alt={storyRoot.title}
                className={classes.avatar}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid justify="center" container spacing={24} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">
                by: <HeaderAvatar author={author} />
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid
                justify="space-between"
                container
                spacing={24}
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="subtitle2">
                    <RemoveRedEye /> 0 watched
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <ThumbUpOutlined /> 0 votes
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    <ShareOutlined /> 0 forks
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid justify="center" container spacing={24} alignItems="center">
            <Grid item xs={12} md={8}>
              <Editor editorState={editorState} readOnly={true} />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid justify="center" container spacing={24} alignItems="center">
            <Grid item xs={12} md={8}>
              <CustomTextEditor editorState={editorState} readOnly={true} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    storyRoot: state.user.storyRootDetail,
    author: state.user.authorDetail
  };
};

const StoryWriterWithStyles = withStyles(styles)(StoryWriter);

export default connect(
  mapStateToProps,
  { getStoryRoot, unSetStoryRoot, unSetAuthor }
)(StoryWriterWithStyles);
