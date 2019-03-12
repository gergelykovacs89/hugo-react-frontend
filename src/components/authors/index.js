import React from "react";
import AuthorCard from "./AuthorCard";
import { Grid, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Authors extends React.Component {
  renderAuthors = (authors) => {
    return authors.map(author => (
      <Grid key={author._id} item>
          <AuthorCard author={author} />
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
            {this.renderAuthors(authors)}
            <Grid key={"createAuthor"} item>
              <Button
                component={RouterLink}
                to="/create-author"
                color="default"
                variant="outlined"
                style={{
                  marginTop: "14vw",
                  width: "14vw",
                  height: "14vw",
                  minWidth: "125px",
                  minHeight: "125px"
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
  return { authors: Object.values(state.authors) };
};

const AuthorsWithStyles = withStyles(styles)(Authors);

export default connect(
  mapStateToProps,
  {}
)(AuthorsWithStyles);
