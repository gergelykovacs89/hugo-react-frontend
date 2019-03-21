import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getStoryRoot, unSetStoryRoot } from "../../actions/story";
import {
  Paper,
  CircularProgress,
  withStyles,
  Grid,
  Avatar,
  Typography
} from "@material-ui/core";

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
    marginLeft: "1vw",
    [theme.breakpoints.up("md")]: {
      marginLeft: "2vw"
    },
    marginTop: "2vh",
    marginBottom: "2vh",
    minHeight: "100px",
    minWidth: "100px",
    height: "13vw",
    width: "13vw"
  },
  title: {
    marginTop: "4vh",
    fontSize: "23px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "4vw"
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "10vw"
    }
  }
});

class StoryWriter extends React.Component {
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
    if (!this.props.storyRoot) {
      return this.circularProgress;
    }
    const { storyRoot, classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            justify="space-between"
            container
            spacing={24}
            alignItems="flex-start"
          >
            <Grid item xs={9}>
              <Typography variant="h2" className={classes.title}>
                {storyRoot.title}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Avatar
                src={storyRoot.imgPath}
                alt={storyRoot.title}
                className={classes.avatar}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    storyRoot: state.user.storyRootDetail
  };
};

const StoryWriterWithStyles = withStyles(styles)(StoryWriter);

export default connect(
  mapStateToProps,
  { getStoryRoot, unSetStoryRoot }
)(StoryWriterWithStyles);
