import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  theme => ({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      }
    }
  }),
  { name: "MuiSnackbar" }
);

export default function CustomizedSnackbars(props) {
  const { msg, shiftMode, ctrlMode, openStatus: openProp } = props;
  const [open, setOpen] = React.useState(openProp);
  const classes = useStyles();
  if (openProp !== open) setOpen(openProp);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={
          <>
            {shiftMode && <AddBoxRoundedIcon fontSize="small" />}
            {ctrlMode && <IndeterminateCheckBoxIcon fontSize="small" />}
          </>
        }
      />
    </div>
  );
}
