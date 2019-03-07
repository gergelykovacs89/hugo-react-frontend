import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="default">
              hugo
            </Typography>
            <Button component={RouterLink} to="/login" color="default">
              Login
            </Button>
            <Button component={RouterLink} to="/register" color="default">
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
