import React, { Fragment } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Link,
  CircularProgress,
  withStyles
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";
import HeaderAvatar from "./HeaderAvatar";
import HeaderMenu from "./HeaderMenu";

const styles = theme => ({
  headerAvatar: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  }
});

class Header extends React.Component {
  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { isSignedIn, isAuthorSelected, author, classes } = this.props;
    const guestButtons = (
      <Fragment>
        <Button component={RouterLink} to="/login" color="default">
          Login
        </Button>
        <Button component={RouterLink} to="/register" color="default">
          Register
        </Button>
      </Fragment>
    );

    const circularProgress = (
      <Fragment>
        <CircularProgress color="inherit" />
      </Fragment>
    );

    const authButtons = (
      <Fragment>
        <Button
          onClick={this.onLogout}
          color="default"
          size="large"
          style={{ flex: 1 }}
        >
          Logout
        </Button>
      </Fragment>
    );

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid
              justify="space-between"
              container
              spacing={24}
              alignItems="center"
            >
              <Grid item>
                <Link component={RouterLink} to="/" underline="none">
                  <Typography variant="h6" color="default">
                    hugo
                  </Typography>
                </Link>
              </Grid>
              <Grid item className={classes.headerAvatar}>
                {isAuthorSelected === null ? (
                  circularProgress
                ) : isAuthorSelected ? (
                  <HeaderAvatar author={author} />
                ) : null}
              </Grid>
              <Grid item className={classes.createStory}>
                {isAuthorSelected === null ? (
                  circularProgress
                ) : isAuthorSelected ? (
                  <Button component={RouterLink} to="/s/create" >
                    <Typography
                      variant="subtitle1"
                      color="default"
                      style={{ fontSize: "2.5vh", textTransform: "none" }}
                    >
                      + story
                    </Typography>
                  </Button>
                ) : null}
              </Grid>
              <Grid item>
                {isSignedIn === null ? (
                  circularProgress
                ) : isSignedIn ? (
                  isAuthorSelected ? (
                    <HeaderMenu author={author} />
                  ) : (
                    authButtons
                  )
                ) : (
                  guestButtons
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.user.isSignedIn,
    isAuthorSelected: state.user.isAuthorSelected,
    author: _.pick(state.authors[state.user.authorId], "name", "imgPath", "_id")
  };
};

const HeaderWithStyles = withStyles(styles)(Header);

export default connect(
  mapStateToProps,
  { logout }
)(HeaderWithStyles);
