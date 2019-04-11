import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchChildTexts } from "../../actions/text";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  AccountCircle,
  AccountCircleOutlined,
  ShareOutlined,
  Code,
  Close
} from "@material-ui/icons";
import TextGrid from "./TextGrid";

const styles = {
  drawerPaper: {
    width: "95%",
    padding: 20
  },
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
    this.props.fetchChildTexts(parentTextId);
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
        <Grid
          justify="space-between"
          container
          alignItems="flex-start"
          className={classes.container}
        >
          <Grid item xs={12} sm={5} md={4} lg={3}>
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
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            {!this.props.childTexts ? (
              this.circularProgress
            ) : (
              <TextGrid childTexts={this.props.childTexts} />
            )}
          </Grid>
        </Grid>
      </div>
    );

    return (
      <div>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer(false)}
          classes={{
            paper: classes.drawerPaper
          }}
        >
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

const mapStateToProps = (state, ownProps) => {
  return {
    childTexts: state.navigation.currentlyVisitedChildTexts
  };
};

const DrawerWithStyles = withStyles(styles)(TemporaryDrawer);

export default connect(
  mapStateToProps,
  { fetchChildTexts }
)(DrawerWithStyles);
