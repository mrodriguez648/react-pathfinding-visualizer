import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu
} from "@material-ui/core";

const useStyles = makeStyles(
  {
    root: {
      padding: "0 30px",
      margin: "0 25px"
    }
  },
  { name: "SelectedMenu" }
);

export default function SimpleListMenu(props) {
  const { setAlgoCallback, options, setPathfinderAlgoIdxCallback } = props;
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = event => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorElement(null);
    setAlgoCallback(options[index]);
    setPathfinderAlgoIdxCallback(index);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="choose an algorithm"
          onClick={handleClickListItem}
        >
          <ListItemText
            primaryTypographyProps={{ variant: "button" }}
            secondaryTypographyProps={{ color: "initial" }}
            primary="Choose an algorithm"
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
            disabled={index > 0}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
