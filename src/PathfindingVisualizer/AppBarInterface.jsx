import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import SelectedMenu from "./SelectedMenu";

const ALGO_NAMES = ["Dijstrka's", "A* Search", "BFS", "DFS"];

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

export default function DynamicCSSInterface(props) {
  const { runDijkstra, resetGrid, appBarColor } = props;

  const [selectedAlgo, setSelectedAlgo] = React.useState(ALGO_NAMES[0]);
  const [isVisualizing, setIsVisualizing] = React.useState(false);

  const handleResetGrid = () => {
    setIsVisualizing(false);
    resetGrid();
  };

  const handleRunAlgo = () => {
    setIsVisualizing(true);
    runDijkstra();
  };

  return (
    <>
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
        </Toolbar>
      </StyledAppBar>
    </>
  );
}

function Appbar(props) {
  const {
    ALGO_NAMES,
    isVisualizing,
    selectedAlgo,
    setSelectedAlgo,
    runDijkstra,
    resetGrid,
    style
  } = props;
  if (style === "purp") {
    return (
      <>
        <PurpBar position="static">
          <Toolbar color="primary">
            <Typography align="left" variant="h5">
              Pathfinding Visualizer
            </Typography>
            <SelectedMenu options={ALGO_NAMES} changeAlgo={setSelectedAlgo} />
            <StyledButton onClick={runDijkstra} disabled={isVisualizing}>
              Run {selectedAlgo}
            </StyledButton>
            <StyledButton onClick={resetGrid}>Reset Grid</StyledButton>
            {/* <Typography align="right" variant="h6" color="initial">
					Shift Pressed: Adding Walls
					</Typography>
					<Typography align="right" variant="h6" color="initial">
						Ctrl  Pressed: Deleting Walls
					</Typography> */}
          </Toolbar>
        </PurpBar>
      </>
    );
  } else if (style === "green") {
    return (
      <>
        <GreenBar position="static">
          <Toolbar color="primary">
            <Typography align="left" variant="h5">
              Pathfinding Visualizer
            </Typography>
            <SelectedMenu options={ALGO_NAMES} changeAlgo={setSelectedAlgo} />
            <StyledButton onClick={runDijkstra} disabled={isVisualizing}>
              Run {selectedAlgo}
            </StyledButton>
            <StyledButton onClick={resetGrid}>Reset Grid</StyledButton>
            {/* <Typography align="right" variant="h6" color="initial">
					Shift Pressed: Adding Walls
					</Typography>
					<Typography align="right" variant="h6" color="initial">
						Ctrl  Pressed: Deleting Walls
					</Typography> */}
          </Toolbar>
        </GreenBar>
      </>
    );
  } else {
    return (
      <>
        <Appbar position="static">
          <Toolbar color="primary">
            <Typography align="left" variant="h5">
              Pathfinding Visualizer
            </Typography>
            <SelectedMenu options={ALGO_NAMES} changeAlgo={setSelectedAlgo} />
            <StyledButton onClick={runDijkstra} disabled={isVisualizing}>
              Run {selectedAlgo}
            </StyledButton>
            <StyledButton onClick={resetGrid}>Reset Grid</StyledButton>
            {/* <Typography align="right" variant="h6" color="initial">
				Shift Pressed: Adding Walls
				</Typography>
				<Typography align="right" variant="h6" color="initial">
					Ctrl  Pressed: Deleting Walls
				</Typography> */}
          </Toolbar>
        </Appbar>
      </>
    );
  }
}
