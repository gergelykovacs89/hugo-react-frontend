import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import StoryRootCard from "./StoryRootCard";

class StoryRootGrid extends React.Component {
  renderRootList = (storyRoots, isSelf) => {
    return storyRoots.map(root => (
      <Grid item key={root._id} xs={12} sm={6} md={4} lg={4}>
        <StoryRootCard root={root} isSelf={isSelf}/>
      </Grid>
    ));
  };

  render() {
    const { storyRoots, isSelf } = this.props;
    return (
      <Fragment>
        <Grid container justify="center" spacing={24}>
          {this.renderRootList(storyRoots, isSelf)}
        </Grid>
      </Fragment>
    );
  }
}

export default StoryRootGrid;
