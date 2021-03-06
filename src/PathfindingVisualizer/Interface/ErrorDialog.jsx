import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

function ErrorDialog(props) {
  const { randomizeNodes, keepWalls, resetGridCallback, openProp } = props;
  const [open, setOpen] = React.useState(false);
  if (open !== openProp) setOpen(openProp);

  const handleResetClose = () => {
    setOpen(false);
    resetGridCallback(randomizeNodes, keepWalls);
  };

  return (
    <div>
      <Dialog
        onClose={handleResetClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleResetClose}>
          No path found!
        </DialogTitle>
        <DialogContent dividers>
          <div id="dialog-error-msg">
            <Typography gutterBottom>
              No path was found to the target node!
            </Typography>
          </div>
        </DialogContent>
        <Button onClick={handleResetClose} color="primary">
          Reset Grid
        </Button>
      </Dialog>
    </div>
  );
}

export default React.memo(ErrorDialog);
