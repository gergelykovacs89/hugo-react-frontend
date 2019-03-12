import React, { Fragment } from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "../../actions";
import { connect } from "react-redux";

class Header extends React.Component {
  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { isSignedIn } = this.props;

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

    const authButtons = (
      <Fragment>
        <Button onClick={this.onLogout} color="default" style={{ flex: 1 }}>
          Logout
        </Button>
      </Fragment>
    );

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid
              justify="space-between" // Add it here :)
              container
              spacing={24}
            >
              <Grid item>
                <Typography variant="h6" color="default">
                  hugo
                </Typography>
              </Grid>
              <Grid item>{isSignedIn ? authButtons : guestButtons}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.user.isSignedIn };
};

export default connect(
  mapStateToProps,
  { logout }
)(Header);
