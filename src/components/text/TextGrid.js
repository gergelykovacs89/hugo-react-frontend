import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import TextCard from "./TextCard";

class TextGrid extends React.Component {
  renderRootList = (texts) => {
    return texts.map(text => (
      <Grid item key={text._id} xs={12} sm={6} md={4} lg={4}>
        <TextCard text={text} onSelectFork={this.props.onSelectFork} showAuthor={false}/>
      </Grid>
    ));
  };

  render() {
    const { texts } = this.props;
    return (
      <Fragment>
        <Grid container justify="center" spacing={24}>
          {this.renderRootList(texts)}
        </Grid>
      </Fragment>
    );
  }
}

export default TextGrid;