import React, { Fragment } from "react";
import { connect } from "react-redux";
import { getAuthor } from "../../actions";
import {
  Paper,
  Typography,
  CircularProgress,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  paper: {
    marginTop: "2vh"
  }
});

class AuthorDetail extends React.Component {
  componentDidMount() {
    this.props.getAuthor(this.props.match.params.id);
  }

  circularProgress = (
    <Fragment>
      <CircularProgress color="inherit" />
    </Fragment>
  );

  render() {
    if (!this.props.author) {
      return this.circularProgress;
    }
    const { author, classes } = this.props;
    return (
      <Fragment>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h3">
            {author.name}
          </Typography>
        </Paper>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    author: state.user.authorDetail
  };
};

const AuthorDetailWithStyles = withStyles(styles)(AuthorDetail);

export default connect(
  mapStateToProps,
  { getAuthor }
)(AuthorDetailWithStyles);
