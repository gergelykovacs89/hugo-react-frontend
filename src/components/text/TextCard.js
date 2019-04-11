import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AuthorDetailByText from "../authors/AuthorDetailByText";

const styles = {
  card: {},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  author: {
    fontSize: 18,
    marginLeft: "2vw"
  },
  pos: {
    marginBottom: 12
  }
};

function TextCard(props) {
  const { classes, text } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="p">{getPreview(text)}</Typography>
      </CardContent>
      <CardActions>
        <Typography
          className={classes.author}
          color="textSecondary"
          gutterBottom
        >
          by: <AuthorDetailByText author={text._authorId} noImg={true} />
        </Typography>
      </CardActions>
    </Card>
  );
}

const getPreview = text => {
  return JSON.parse(text.text).blocks[0].text;
};

TextCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextCard);
