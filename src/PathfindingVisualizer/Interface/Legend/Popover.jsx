import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1),
    maxWidth: "20%"
  }
}));

export default function MouseOverPopover(props) {
  const { nodeType, msg, transformOriginHorizontal } = props;
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElement(null);
  };

  const open = Boolean(anchorElement);

  return (
    <>
      <div
        className={`node ${nodeType}`}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: transformOriginHorizontal
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>{msg}</Typography>
      </Popover>
    </>
  );
}
