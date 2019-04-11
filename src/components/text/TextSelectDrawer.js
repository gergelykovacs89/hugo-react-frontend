import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  AccountCircle,
  AccountCircleOutlined,
  ShareOutlined,
  Code,
  Close
} from "@material-ui/icons";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class TemporaryDrawer extends React.Component {
  state = {
    left: false,
    parentTextId: null
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open
    });
    if (!open) {
      this.setState({
        parentTextId: null
      });
      this.props.onClose();
    }
  };

  openDrawer = parentTextId => {
    this.setState({
      left: true,
      parentTextId: parentTextId
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.parentTextId !== this.state.parentTextId &&
      nextProps.parentTextId !== null
    ) {
      this.openDrawer(nextProps.parentTextId);
    }
  }

  render() {
    const { classes } = this.props;
    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <ShareOutlined />
            </ListItemIcon>
            <ListItemText primary={"all forks"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"from this author"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"from me"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {["tag1", "tag2", "tag3"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <Code />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button key={"close"} onClick={this.toggleDrawer(false)}>
            <ListItemIcon>
              <Close />
            </ListItemIcon>
            <ListItemText primary={"close"} />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          <div tabIndex={0} role="button" onKeyDown={this.toggleDrawer(false)}>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TemporaryDrawer);
