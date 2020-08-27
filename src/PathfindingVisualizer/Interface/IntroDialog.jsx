import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const MESSAGES = [
  "This tool simulates pathfinding algorithms within a grid layout.",
  "Click on any node on the grid to construct a wall that the algorithm cannot pass through to get to the target node.",
  "Press the shift key to enter wall building mode, where you can mouse over the grid nodes and turn them into wall nodes.",
  "Press the ctrl key to enter wall deletion mode, where you can mouseover existing wall nodes on the grid to remove them.",
  "You can reposition the start/target nodes by clicking and dragging them into empty nodes.",
  "Mouseover any node type in the legend to learn more about each node."
];

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

export default function CustomizedDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Welcome to Pathfinding Visualizer
        </DialogTitle>
        <DialogContent dividers>
          {MESSAGES.map((msg, msgIdx) => {
            return (
              <div id={`intro-dialog-msg-${msgIdx}`} key={msg}>
                <Typography gutterBottom>{msg}</Typography>
              </div>
            );
          })}
        </DialogContent>
      </Dialog>
    </div>
  );
}
