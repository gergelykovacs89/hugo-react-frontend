import React, { Fragment } from "react";
import { withStyles, Menu, MenuItem, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import HeaderAvatar from "./HeaderAvatar";
import { connect } from "react-redux";
import { logout, onSelectAuthor } from "../../actions";

const styles = theme => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
});

class HeaderMenu extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  onSelectAuthor = () => {
    this.handleMenuClose();
    this.props.onSelectAuthor();
  };

  onLogout = () => {
    this.handleMenuClose();
    this.props.logout();
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, author } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.onSelectAuthor}>Select Author</MenuItem>
        <MenuItem onClick={this.onLogout}>Logout</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <HeaderAvatar author={author} />
        </MenuItem>
        <MenuItem onClick={this.onSelectAuthor}>
          <p>Select Author</p>
        </MenuItem>
        <MenuItem onClick={this.onLogout}>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    );

    return (
      <Fragment>
        <div className={classes.sectionDesktop}>
          <IconButton
            aria-owns={isMenuOpen ? "material-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-haspopup="true"
            onClick={this.handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </div>
        {renderMenu}
        {renderMobileMenu}
      </Fragment>
    );
  }
}

const HeaderMenuWithStyles = withStyles(styles)(HeaderMenu);

export default connect(
  null,
  { logout, onSelectAuthor }
)(HeaderMenuWithStyles);
