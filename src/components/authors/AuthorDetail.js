import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  getAuthor,
  followAuthor,
  unFollowAuthor,
  unSetAuthor,
  getStoryRootsForVisitedAuthor
} from "../../actions";
import {
  Paper,
  Typography,
  CircularProgress,
  withStyles,
  Grid,
  Button,
  Avatar
} from "@material-ui/core";
import StoryShow from "../story/StoryShow";

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
      width: "70vw"
    }
  },
  avatar: {
    marginLeft: "3vw",
    [theme.breakpoints.up("md")]: {
      marginLeft: "7vw"
    },
    marginTop: "5vh",
    minHeight: "100px",
    minWidth: "100px",
    height: "13vw",
    width: "13vw"
  },
  authorName: {
    marginTop: "4vh",
    fontSize: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "inline-block"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2vw"
    }
  },
  authorDescription: {
    fontSize: "1vw"
  },
  followButton: {
    marginTop: "1vw",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "2vw",
      marginTop: "0"
    }
  },
  authorControl: {
    paddingLeft: "2vw",
    paddingRight: "2vw",
    marginTop: "3vw"
  }
});

class AuthorDetail extends React.Component {
  componentDidMount() {
    this.props.getAuthor(this.props.match.params.id);
    this.props.getStoryRootsForVisitedAuthor(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getAuthor(nextProps.match.params.id);
      this.props.getStoryRootsForVisitedAuthor(this.props.match.params.id);
    }
  }

  componentWillUnmount() {
    this.props.unSetAuthor();
  }

  onFollow = () => {
    this.props.followAuthor(
      this.props.selectedAuthor._id,
      this.props.author._id
    );
  };

  onUnFollow = () => {
    this.props.unFollowAuthor(
      this.props.selectedAuthor._id,
      this.props.author._id
    );
  };

  circularProgress = (
    <Fragment>
      <CircularProgress color="inherit" />
    </Fragment>
  );

  renderButtons(classes, selectedAuthor, isSelf) {
    if (isSelf) {
      return (
        <Fragment>
          <Button
            variant="outlined"
            size="small"
            disabled={true}
            className={classes.followButton}
          >
            It's a you!
          </Button>
        </Fragment>
      );
    } else {
      const connection = selectedAuthor.following.indexOf(
        this.props.author._id
      );
      if (!connection) {
        return (
          <Fragment>
            <Button
              variant="outlined"
              size="small"
              className={classes.followButton}
              onClick={this.onUnFollow}
            >
              Unfollow
            </Button>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <Button
              variant="contained"
              size="small"
              className={classes.followButton}
              onClick={this.onFollow}
            >
              Follow
            </Button>
          </Fragment>
        );
      }
    }
  }

  render() {
    if (!this.props.author || !this.props.selectedAuthor) {
      return this.circularProgress;
    }
    const { author, selectedAuthor, classes, isSelf, storyRoots } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            justify="space-between"
            container
            spacing={24}
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <Avatar
                alt={author.name}
                src={author.imgPath}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs={8} className={classes.authorControl}>
              <Typography variant="h1" className={classes.authorName}>
                {author.name}
              </Typography>
              <span>{this.renderButtons(classes, selectedAuthor, isSelf)}</span>
              <Typography variant="subtitle1" className={classes.authorData}>
                {"0"} stories {author.followers.length} followers{" "}
                {author.following.length} following
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.authorDescription}
              >
                {author.description}
              </Typography>
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={6} />
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <StoryShow storyRoots={storyRoots} />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    author: state.user.authorDetail,
    selectedAuthor: state.authors[state.user.authorId],
    isSelf: state.authors[ownProps.match.params.id] ? true : false,
    storyRoots: state.user.storyRoots
  };
};

const AuthorDetailWithStyles = withStyles(styles)(AuthorDetail);

export default connect(
  mapStateToProps,
  {
    getAuthor,
    followAuthor,
    unFollowAuthor,
    unSetAuthor,
    getStoryRootsForVisitedAuthor
  }
)(AuthorDetailWithStyles);
