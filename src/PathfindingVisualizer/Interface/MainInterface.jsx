import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import SelectedMenu from "./SelectedMenu";
import IntroDialog from "./IntroDialog";
import ErrorDialog from "./ErrorDialog";
import CallbackCheckBox from "./RandomizeCheckbox";

const ALGO_NAMES = ["Dijstrka's", "A* Search (WIP)", "BFS (WIP)", "DFS (WIP)"];

const StyledButton = withStyles({
  root: {
    outline: "2px solid white",
    borderRadius: 3,
    border: 1,
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: "0 25px",
    "&$disabled": { color: "red" }
  },
  disabled: {}
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
  const { runDijkstra, resetGrid, appBarColor, errorStatus } = props;
  const [selectedAlgo, setSelectedAlgo] = React.useState(ALGO_NAMES[0]);
  const [isVisualizing, setIsVisualizing] = React.useState(false);
  const [randomizeNodes, setRandomizeNodes] = React.useState(false);
  const [resetWalls, setResetWalls] = React.useState(true);

  const handleResetGrid = () => {
    setIsVisualizing(false);
    resetGrid(randomizeNodes, resetWalls);
  };

  const handleRunAlgo = () => {
    setIsVisualizing(true);
    runDijkstra();
  };

  const setRandomizeNodesCallback = () => {
    setRandomizeNodes(!randomizeNodes);
  };

  const setResetWallCallback = () => {
    setResetWalls(!resetWalls);
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
            <SelectedMenu options={ALGO_NAMES} changeAlgo={setSelectedAlgo} />
            <StyledButton onClick={handleRunAlgo} disabled={isVisualizing}>
              Run {selectedAlgo}
            </StyledButton>
            <StyledButton onClick={handleResetGrid}>Reset Grid</StyledButton>
            <div id="interface-checkboxes">
              <CallbackCheckBox
                checkCallback={setRandomizeNodesCallback}
                msg="Reposition Start/Target node on reset?"
              />
              <CallbackCheckBox
                checkCallback={setResetWallCallback}
                msg="Delete all Wall nodes on reset?"
              />
            </div>
          </Toolbar>
        </StyledAppBar>
      </div>
      <div className="error-dialog">
        <ErrorDialog
          randomizeNodes={randomizeNodes}
          resetGrid={handleResetGrid}
          openProp={errorStatus}
        />
      </div>
    </>
  );
}

export default React.memo(DynamicCSSInterface);
