import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ResponsiveDialog from "../layouts/Dialog";
import { connect } from "react-redux";
import { deleteAuthor } from "../../actions";

const styles = {
  card: {
    marginTop: "10vw",
    height: "23vw",
    width: "14vw",
    minWidth: "125px",
    minHeight: "240px"
  },
  media: {
    height: "14vw",
    width: "14vw",
    minWidth: "125px",
    minHeight: "125px"
  }
};

class AuthorCard extends React.Component {
  onSubmit = authorId => {
    this.props.deleteAuthor(authorId);
  };

  render() {
    const { classes, author } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={author.imgPath}
            title={author.name}
          />
          <CardContent>
            <Typography variant="subtitle1">{author.name}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            component={RouterLink}
            to={`/edit-author/${author._id}`}
            size="small"
            color="primary"
          >
            Edit
          </Button>
          <ResponsiveDialog
            buttonTitle="Delete"
            authorName={author.name}
            authorId={author._id}
            onSubmit={this.onSubmit}
          />
        </CardActions>
      </Card>
    );
  }
}

AuthorCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const AuthorCardWithStyles = withStyles(styles)(AuthorCard);

export default connect(
  null,
  { deleteAuthor }
)(AuthorCardWithStyles);
