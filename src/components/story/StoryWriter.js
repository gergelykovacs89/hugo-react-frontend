import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getStoryRoot, unSetStoryRoot } from "../../actions/story";
import { unSetAuthor } from "../../actions";
import { selectForkFromDrawer, unSetStoryRootTexts } from "../../actions/text";
import HeaderAvatar from "../layouts/HeaderAvatar";
import {
  Paper,
  CircularProgress,
  withStyles,
  Grid,
  Typography,
  Button,
  CardMedia
} from "@material-ui/core";
import {
  RemoveRedEye,
  ThumbUpOutlined,
  ShareOutlined
} from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import TextShow from "../text/TextShow";
import TextSelectDrawer from "../text/TextSelectDrawer";

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
  media: {
    height: 280
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
  state = {
    parentTextId: null
  };
  scrollToBottom = () => {
    this.textsEnd.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  componentDidMount() {
    this.props.getStoryRoot(this.props.match.params.id);
    this.textsEnd = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getStoryRoot(nextProps.match.params.id);
    }

    if (
      nextProps.texts.length !== this.props.texts.length &&
      this.props.texts.length !== 0
    ) {
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    this.props.unSetStoryRoot();
    this.props.unSetAuthor();
    this.props.unSetStoryRootTexts();
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

  renderEditButton = (author, storyRoot) => {
    if (this.props.selfAuthorId === author._id) {
      return (
        <Fragment>
          <Button
            component={RouterLink}
            to={{
              pathname: `/s/update/${storyRoot._id}`,
              state: { rootTextId: storyRoot._rootTextId }
            }}
            color="default"
            variant="contained"
          >
            edit root
          </Button>
        </Fragment>
      );
    }
  };

  handleBrowseForks = parentTextId => {
    this.setState({ parentTextId });
  };

  onCloseBrowseForks = () => {
    this.setState({ parentTextId: null });
  };

  onSelectFork = textId => {
    this.props.selectForkFromDrawer(textId);
  };

  renderTexts = () => {
    return this.props.texts.map(text =>
      text._id === this.props.storyRoot._rootTextId ? null : JSON.parse(
          text.text
        ).blocks[0].text === "" ? (
        <TextShow
          key={text._id}
          textId={text._id}
          editMode={this.props.lastTextId === text._id}
          isFull={this.props.lastTextId === text._id}
          handleBrowseForks={this.handleBrowseForks}
        />
      ) : (
        <TextShow
          key={text._id}
          textId={text._id}
          editMode={false}
          isFull={false}
          handleBrowseForks={this.handleBrowseForks}
        />
      )
    );
  };

  render() {
    if (!this.props.storyRoot || !this.props.author) {
      return this.circularProgress;
    }
    const { storyRoot, classes, author } = this.props;
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
              <CardMedia
                className={classes.media}
                image={storyRoot.imgPath}
                title={storyRoot.title}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid justify="center" container spacing={24} alignItems="center">
            <Grid item xs={12} md={6}>
              <Grid
                justify="space-between"
                container
                spacing={24}
                alignItems="center"
              >
                <Grid item xs={6}>
                  <Typography variant="subtitle2">
                    by: <HeaderAvatar author={author} />
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {this.renderEditButton(author, storyRoot)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                justify="space-evenly"
              >
                <Grid item>
                  <RemoveRedEye />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">0 watched</Typography>
                </Grid>
                <Grid item>
                  <ThumbUpOutlined />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">0 votes</Typography>
                </Grid>
                <Grid item>
                  <ShareOutlined />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">0 forks</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <TextShow
          textId={storyRoot._rootTextId}
          handleBrowseForks={this.handleBrowseForks}
        />
        <Fragment>{this.renderTexts()}</Fragment>
        <TextSelectDrawer
          parentTextId={this.state.parentTextId}
          onClose={this.onCloseBrowseForks}
          onSelectFork={this.onSelectFork}
        />
        <div ref={this.textsEnd} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    storyRoot: state.navigation.currentlyVisitedStoryRootDetail,
    author: state.navigation.currentlyVisitedAuthorDetail,
    selfAuthorId: state.user.authorId,
    texts: Object.values(state.navigation.currentlyVisitedStoryRootTexts),
    lastTextId: state.navigation.currentLastTextIdOfStory
  };
};

const StoryWriterWithStyles = withStyles(styles)(StoryWriter);

export default connect(
  mapStateToProps,
  {
    getStoryRoot,
    unSetStoryRoot,
    unSetAuthor,
    selectForkFromDrawer,
    unSetStoryRootTexts
  }
)(StoryWriterWithStyles);
