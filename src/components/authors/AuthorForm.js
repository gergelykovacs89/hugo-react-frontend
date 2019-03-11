import React from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import {
  Paper,
  Avatar,
  Typography,
  Button,
  TextField
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

class AuthorForm extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  

  renderTextField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { handleSubmit, pristine, submitting, classes, title } = this.props;
    console.log(errors);
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <form
            className={classes.registerForm}
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <div>
              <Field
                name="name"
                type="text"
                component={this.renderTextField}
                label="Author name:"
                error={errors["name"] !== undefined}
                helperText={errors["name"]}
                fullWidth
                autoComplete="off"
              />
            </div>
            <div>
              <Field
                name="imgPath"
                component={this.renderTextField}
                label="imgPath:"
                type="text"
                error={errors["imgPath"] !== undefined}
                helperText={errors["imgPath"]}
                fullWidth
                autoComplete="off"
              />
            </div>
            <div>
              <Field
                name="description"
                component={this.renderTextField}
                label="Description:"
                type="text"
                error={errors["description"] !== undefined}
                helperText={errors["description"]}
                fullWidth
                autoComplete="off"
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
              disabled={pristine || submitting}
            >
              {title}
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

AuthorForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: "authorForm"
})(withStyles(styles)(AuthorForm));
