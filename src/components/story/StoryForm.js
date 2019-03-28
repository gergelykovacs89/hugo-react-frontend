import React from "react";
import { Field, reduxForm } from "redux-form";
import { Paper, Typography, Button, TextField } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomTextEditor from "../text/CustomTextEditor";
import history from "../../history";

const styles = theme => ({
  main: {
    display: "block", // Fix IE 11 issue.
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: "70vw",
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  registerForm: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class StoryForm extends React.Component {
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
    const {
      handleSubmit,
      classes,
      title,
      editorState,
      onEditorChange,
      full
    } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <form
            className={classes.registerForm}
            onSubmit={handleSubmit(this.onSubmit)}
          >
            <div>
              <Field
                name="title"
                type="text"
                component={this.renderTextField}
                label="title:"
                error={errors["title"] !== undefined}
                helperText={errors["title"]}
                disabled={title === "Edit Story" ? true : false}
                fullWidth
                autoComplete="off"
              />
            </div>
            <div>
              <Field
                name="summary"
                component={this.renderTextField}
                label="short summary:"
                type="text"
                error={errors["summary"] !== undefined}
                helperText={errors["summary"]}
                fullWidth
                multiline
                rows="3"
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
            <CustomTextEditor
              className={full ? classes.editorFull : null}
              editorState={editorState}
              onEditorChange={onEditorChange}
              isFull={true}
            />
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
          <Button
            onClick={history.goBack}
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            back
          </Button>
        </Paper>
      </main>
    );
  }
}

export default reduxForm({
  form: "storyForm",
  enableReinitialize: true
})(withStyles(styles)(StoryForm));
