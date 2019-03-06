import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

class Header extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="default" >
              hugo
            </Typography>
            <Button color="default">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
