import React from "react";

class StoryShow extends React.Component {
  render() {
    const { storyRoots } = this.props;
    console.log(storyRoots);
    return <div>StoryShow</div>;
  }
}

export default StoryShow;
