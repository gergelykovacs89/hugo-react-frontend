import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  card: {
   
  },
  media: {
    height: 140
  }
};

class StoryRootCard extends React.Component {
  renderButtons = isSelf => {
    if (isSelf) {
      return (
        <CardActions>
          <Button
            size="small"
            color="default"
            variant="contained"
            component={RouterLink}
            to={{
              pathname: `/s/update/${this.props.root._id}`,
              state: { rootTextId: this.props.root._rootTextId }
            }}
          >
            Edit
          </Button>
          <Button size="small" color="secondary" variant="contained">
            Delete
          </Button>
        </CardActions>
      );
    }
  };

  render() {
    const { classes, root, isSelf } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea component={RouterLink} to={`/sw/${root._id}`}>
          <CardMedia
            className={classes.media}
            image={root.imgPath}
            title={root.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {root.title}
            </Typography>
            <Typography component="p">{root.summary}</Typography>
          </CardContent>
        </CardActionArea>
        {this.renderButtons(isSelf)}
      </Card>
    );
  }
}

StoryRootCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StoryRootCard);
