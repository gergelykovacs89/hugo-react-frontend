import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Avatar,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.default
  },
  registerForm: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class AuthForm extends React.Component {
  renderRePassword() {
    if (this.props.title !== "Login") {
      return (
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="passwordRe">Re-type password</InputLabel>
          <Input
            name="passwordRe"
            type="password"
            id="passwordRe"
            autoComplete="current-password"
          />
        </FormControl>
      );
    }
  }

  render() {
    const { classes, title } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <form className={classes.registerForm}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </FormControl>
            {this.renderRePassword()}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
            >
              {title}
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

AuthForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthForm);
