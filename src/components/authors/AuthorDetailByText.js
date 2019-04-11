import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { ButtonBase, Typography, Button, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const styles = {
  avatar: {
    marginRight: "0.5vw"
  }
};

function AuthorDetailByText(props) {
  const { classes, author, noName } = props;
  return (
    <Link to={`/a/${author._id}`} component={RouterLink} underline="none">
      <ButtonBase component={Button}>
        <Avatar
          alt={author.name}
          src={author.imgPath}
          className={classes.avatar}
        />
        {!noName ? <Typography
          variant="subtitle1"
          color="default"
          style={{ fontSize: "2.5vh", textTransform: "none" }}
        >
          {author.name}
        </Typography> : null}
        
      </ButtonBase>
    </Link>
  );
}

AuthorDetailByText.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthorDetailByText);
