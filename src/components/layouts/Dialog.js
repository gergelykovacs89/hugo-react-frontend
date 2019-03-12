import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

class ResponsiveDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onSubmit = () => {
    this.props.onSubmit(this.props.authorId);
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          {this.props.buttonTitle}
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {`Are you sure you want to delete ${this.props.authorName}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.dialog}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              No
            </Button>
            <Button onClick={this.onSubmit} color="secondary" autoFocus>
              {this.props.buttonTitle}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ResponsiveDialog);
