import React from "react";
import { Grid, Paper, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: 50,
    height: 250,
    width: 250
  }
});

class Authors extends React.Component {
  renderAuthors = (authors, classes) => {
    authors.map(author => (
      <Grid key={author._id} item>
        <Paper className={classes.paper} />
      </Grid>
    ));
  };

  render() {
    const { classes, authors } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.demo}
            justify="center"
            spacing={16}
          >
            {this.renderAuthors(authors, classes)}
            <Grid key={"createAuthor"} item>
              <Button component={RouterLink} to="/create-author"
                color="default"
                variant="outlined"
                style={{
                  marginTop: "100px",
                  width: "12vw",
                  height: "12vw",
                  minWidth: "100px",
                  minHeight: "100px",
                  fontSize: "1.65vw"
                }}
              >
                + author
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return { authors: state.user.authors };
};

const AuthorsWithStyles = withStyles(styles)(Authors);

export default connect(
  mapStateToProps,
  {}
)(AuthorsWithStyles);
