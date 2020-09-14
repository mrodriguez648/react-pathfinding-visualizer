import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import SelectedMenu from "./SelectedMenu";
import IntroDialog from "./IntroDialog";
import ErrorDialog from "./ErrorDialog";
import CallbackCheckBox from "./RandomizeCheckbox";

const StyledButton = withStyles({
  root: {
    outline: "2px solid white",
    borderRadius: 3,
    border: 1,
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: "0 25px"
  }
})(Button);

const styledBy = (property, mapping) => props => mapping[props[property]];

const styles = {
  colorPrimary: {
    backgroundColor: styledBy("color", {
      default: "#3f51b5",
      red: "red",
      green: "green"
    })
  }
};

const StyledAppBar = withStyles(styles)(({ classes, color, ...other }) => (
  <AppBar className={classes.colorPrimary} {...other} />
));

function DynamicCSSInterface(props) {
  const {
    runAlgoCallback,
    resetGridCallback,
    setAlgoIdxCallback,
    appBarColor,
    errorStatus,
    algoNames
  } = props;
  const [selectedAlgo, setSelectedAlgo] = React.useState(algoNames[0]);
  const [isVisualizing, setIsVisualizing] = React.useState(false);
  const [randomizeNodes, setRandomizeNodes] = React.useState(false);
  const [keepWalls, setKeepWalls] = React.useState(false);

  const handleResetGrid = () => {
    setIsVisualizing(false);
    resetGridCallback(randomizeNodes, keepWalls);
  };

  const handleRunAlgo = () => {
    setIsVisualizing(true);
    runAlgoCallback(selectedAlgo);
  };

  const setRandomizeNodesCallback = () => {
    setRandomizeNodes(!randomizeNodes);
  };

  const setKeepWallsCallback = () => {
    setKeepWalls(!keepWalls);
  };

  return (
    <>
      <div id="intro-dialog">
        <IntroDialog />
      </div>
      <div className="interface-appbar">
        <StyledAppBar color={appBarColor} position="static">
          <Toolbar>
            <Typography align="left" variant="h5">
              Pathfinding Visualizer
            </Typography>
            <SelectedMenu
              options={algoNames}
              setAlgoCallback={setSelectedAlgo}
              setPathfinderAlgoIdxCallback={setAlgoIdxCallback}
            />
            {!isVisualizing && (
              <StyledButton onClick={handleRunAlgo}>
                Run {selectedAlgo}
              </StyledButton>
            )}
            <StyledButton onClick={handleResetGrid}>Reset Grid</StyledButton>
            <div id="interface-checkboxes">
              <CallbackCheckBox
                checkCallback={setRandomizeNodesCallback}
                msg="Reposition Start/Target node on reset?"
              />
              <CallbackCheckBox
                checkCallback={setKeepWallsCallback}
                msg="Keep all Wall nodes on reset?"
              />
            </div>
          </Toolbar>
        </StyledAppBar>
      </div>
      <div className="error-dialog">
        <ErrorDialog
          randomizeNodes={randomizeNodes}
          resetWalls={keepWalls}
          resetGridCallback={handleResetGrid}
          openProp={errorStatus}
        />
      </div>
    </>
  );
}

export default React.memo(DynamicCSSInterface);
