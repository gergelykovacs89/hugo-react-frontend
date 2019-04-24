import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import StoryRootGrid from "../story/StoryRootGrid";
import TextGrid from "../text/TextGrid";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class AuthorTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  selectText = textId => {
    console.log(textId);
  };

  render() {
    const { classes, theme, storyRoots, isSelf, authorTexts } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="story roots" />
            <Tab label="texts" />
            <Tab label="saved stories" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          action={actions => {
            this.swipeableActions = actions;
          }}
          animateHeight
        >
          <TabContainer dir={theme.direction}>
            <StoryRootGrid storyRoots={storyRoots} isSelf={isSelf} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <TextGrid texts={authorTexts} onSelectFork={this.selectText} />
          </TabContainer>
          <TabContainer dir={theme.direction}>TODO saved stories</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

AuthorTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AuthorTabs);
