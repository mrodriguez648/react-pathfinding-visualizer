import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra } from "../algorithms/dijkstra";
import { Typography } from "@material-ui/core";
import Interface from "./Interface/MainInterface";
import Legend from "./Interface/Legend/Legend";
import StyledSnackbar from "./Snackbar";

import "./PathfindingVisualizer.css";

const isMobile = window.innerWidth <= 800;

let ANIMATION_TIMEOUTS = [];

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowCount: props.rowCount,
      colCount: props.colCount,
      startNodeRow: props.startNodeRow,
      startNodeCol: props.startNodeCol,
      targetNodeRow: props.targetNodeRow,
      targetNodeCol: props.targetNodeCol,
      shiftKeyMode: false,
      ctrlKeyMode: false,
      mouseDownMode: false,
      mouseDownModeSpecialNodeType: null,
      errorStatus: false,
      grid: this.initGrid(
        props.rowCount,
        props.colCount,
        props.startNodeRow,
        props.startNodeCol,
        props.targetNodeRow,
        props.targetNodeCol
      )
    };
  }

  updateStartNode = (newRow, newCol) => {
    const {
      startNodeRow: currStartNodeRow,
      startNodeCol: currStartNodeCol,
      grid
    } = this.state;
    const currStartNode = grid[currStartNodeRow][currStartNodeCol];
    const newStartNode = grid[newRow][newCol];
    const currStartNodeUpdated = React.cloneElement(currStartNode, {
      isStart: false
    });
    grid[currStartNodeRow][currStartNodeCol] = currStartNodeUpdated;
    const newStartNodeUpdated = React.cloneElement(newStartNode, {
      isStart: true
    });
    grid[newRow][newCol] = newStartNodeUpdated;
    this.setState({
      grid: grid,
      startNodeRow: newRow,
      startNodeCol: newCol
    });
  };

  updateTargetNode = (newRow, newCol) => {
    const {
      targetNodeRow: currTargetNodeRow,
      targetNodeCol: currTargetNodeCol,
      grid
    } = this.state;
    const currTargetNode = grid[currTargetNodeRow][currTargetNodeCol];
    const newTargetNode = grid[newRow][newCol];
    const currTargetNodeUpdated = React.cloneElement(currTargetNode, {
      isTarget: false
    });
    grid[currTargetNodeRow][currTargetNodeCol] = currTargetNodeUpdated;
    const newTargetNodeUpdated = React.cloneElement(newTargetNode, {
      isTarget: true
    });
    grid[newRow][newCol] = newTargetNodeUpdated;
    this.setState({
      grid: grid,
      targetNodeRow: newRow,
      targetNodeCol: newCol
    });
  };

  updateWallNode = (row, col, newWallProp) => {
    const newGrid = this.state.grid;
    const oldNode = newGrid[row][col];
    const updatedNode = React.cloneElement(oldNode, { isWall: newWallProp });
    newGrid[row][col] = updatedNode;
    this.setState({ grid: newGrid });
  };

  handleOnKeyDown = e => {
    if (e.repeat) {
      return;
    }
    if (e.shiftKey) {
      this.setState({
        shiftKeyMode: !this.state.shiftKeyMode,
        ctrlKeyMode: false
      });
    } else if (e.ctrlKey) {
      this.setState({
        ctrlKeyMode: !this.state.ctrlKeyMode,
        shiftKeyMode: false
      });
    }
  };

  handleNodeOnMouseDown = specialNodeType => {
    this.setState({
      mouseDownMode: true,
      mouseDownModeSpecialNodeType: specialNodeType
    });
  };

  handleNodeOnMouseUp = () => {
    this.setState({ mouseDownMode: false, mouseDownModeSpecialNodeType: null });
  };

  handleNodeOnMouseEnter = (newRow, newCol, isWallState) => {
    const {
      mouseDownMode,
      mouseDownModeSpecialNodeType: nodeType
    } = this.state;
    if (mouseDownMode && !isWallState) {
      if (nodeType === "start") {
        this.updateStartNode(newRow, newCol);
      } else {
        this.updateTargetNode(newRow, newCol);
      }
    } else if (
      (this.state.shiftKeyMode && !isWallState) ||
      (this.state.ctrlKeyMode && isWallState)
    ) {
      this.updateWallNode(newRow, newCol, !isWallState);
    }
  };

  handleOnMouseLeave = () => {
    if (this.state.mouseDownMode) this.setState({ mouseDownMode: false });
  };

  initGrid = (
    rowCount,
    colCount,
    startNodeRow,
    startNodeCol,
    targetNodeRow,
    targetNodeCol
  ) => {
    while (targetNodeRow === startNodeRow) {
      targetNodeRow = Math.floor(Math.random() * rowCount);
    }
    while (targetNodeCol === startNodeCol) {
      targetNodeCol = Math.floor(Math.random() * colCount);
    }
    const grid = [];
    let nodeCount = 0;
    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        const node = (
          <Node
            key={nodeCount}
            nodeNum={nodeCount}
            row={row}
            col={col}
            isStart={row === startNodeRow && col === startNodeCol}
            isTarget={row === targetNodeRow && col === targetNodeCol}
            isGraphNode={false}
            isShortestPathNode={false}
            isWall={false}
            updateWallNode={this.updateWallNode}
            onMouseEnter={this.handleNodeOnMouseEnter}
            onMouseDown={this.handleNodeOnMouseDown}
          />
        );
        currentRow.push(node);
        nodeCount += 1;
      }
      grid.push(currentRow);
    }
    return grid;
  };

  resetGrid = randomizeNodes => {
    const {
      rowCount,
      colCount,
      startNodeRow,
      startNodeCol,
      targetNodeRow,
      targetNodeCol
    } = this.state;
    // clear in progress and queued animations
    for (let i = 0; i < ANIMATION_TIMEOUTS.length; i++) {
      clearTimeout(ANIMATION_TIMEOUTS[i]);
    }
    if (randomizeNodes) {
      // randomize start and target node positions
      var newStartNodeRow = Math.floor(Math.random() * rowCount);
      while (newStartNodeRow === startNodeRow) {
        newStartNodeRow = Math.floor(Math.random() * rowCount);
      }
      var newStartNodeCol = Math.floor(Math.random() * colCount);
      while (newStartNodeCol === startNodeCol) {
        newStartNodeCol = Math.floor(Math.random() * colCount);
      }
      var newTargetNodeRow = Math.floor(Math.random() * rowCount);
      while (
        newTargetNodeRow === targetNodeRow ||
        newTargetNodeRow === newStartNodeRow
      ) {
        newTargetNodeRow = Math.floor(Math.random() * rowCount);
      }
      var newTargetNodeCol = Math.floor(Math.random() * colCount);
      while (
        newTargetNodeCol === targetNodeCol ||
        newTargetNodeCol === newStartNodeCol
      ) {
        newTargetNodeCol = Math.floor(Math.random() * colCount);
      }
      const newGrid = this.initGrid(
        rowCount,
        colCount,
        newStartNodeRow,
        newStartNodeCol,
        newTargetNodeRow,
        newTargetNodeCol
      );
      this.setState({
        startNodeRow: newStartNodeRow,
        startNodeCol: newStartNodeCol,
        targetNodeRow: newTargetNodeRow,
        targetNodeCol: newTargetNodeCol,
        errorStatus: false,
        grid: newGrid
      });
    } else {
      const newGrid = this.initGrid(
        rowCount,
        colCount,
        startNodeRow,
        startNodeCol,
        targetNodeRow,
        targetNodeCol
      );
      this.setState({
        errorStatus: false,
        grid: newGrid
      });
    }
    ANIMATION_TIMEOUTS = [];
  };

  runDijkstra = () => {
    const {
      startNodeRow,
      startNodeCol,
      targetNodeRow,
      targetNodeCol,
      grid
    } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const targetNode = grid[targetNodeRow][targetNodeCol];
    const visitedGraphNodesInOrder = dijkstra(grid, startNode, targetNode);
    const [targetGraphNode] = visitedGraphNodesInOrder.slice(-1);
    if (targetGraphNode.props.nodeNum !== targetNode.props.nodeNum) {
      console.log("no path found");
      this.setState({ errorStatus: true });
    } else {
      const shortestPathGraphNodes = this.getNodesInShortestPathOrder(
        targetGraphNode
      );
      ANIMATION_TIMEOUTS = this.animateDijsktra(
        visitedGraphNodesInOrder,
        shortestPathGraphNodes
      );
    }
  };

  animateDijsktra = (visitedNodesInOrder, shortestPathGraphNodes) => {
    const animationTimeouts = [];
    let t = 1;
    // animate graph nodes traversed by algo
    for (let i = 0; i < visitedNodesInOrder.length; i++, t++) {
      animationTimeouts.push(
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          const newGrid = this.state.grid;
          const newNode = React.cloneElement(node, { isGraphNode: true });
          newGrid[node.props.row][node.props.col] = newNode;
          this.setState({ grid: newGrid });
        }, 15 * t)
      );
    }

    // animate shortest path obtained through backwards propegation
    for (let i = 0; i < shortestPathGraphNodes.length; i++, t++) {
      animationTimeouts.push(
        setTimeout(() => {
          const node = shortestPathGraphNodes[i];
          const newGrid = this.state.grid;
          const newNode = React.cloneElement(node, {
            isShortestPathNode: true
          });
          newGrid[node.props.row][node.props.col] = newNode;
          this.setState({ grid: newGrid });
        }, 20 * t)
      );
    }

    return animationTimeouts;
  };

  getNodesInShortestPathOrder = targetGraphNode => {
    const nodesInShortestPathOrder = [];
    let currentNode = targetGraphNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  };

  render() {
    const { grid, ctrlKeyMode, shiftKeyMode, errorStatus } = this.state;
    const colorMode = ctrlKeyMode ? "red" : shiftKeyMode ? "green" : "default";

    const snackbarMsg = ctrlKeyMode
      ? "Mode: Deleting Walls"
      : shiftKeyMode
      ? "Mode: Building Walls"
      : "";

    if (isMobile) {
      return (
        <div className="mobile-response">
          <Typography className="mobile-text" variant="h4">
            Sorry, this app isn't mobile responsive yet! WIP!
          </Typography>
        </div>
      );
    } else {
      return (
        <>
          <div className="interface">
            <Interface
              runDijkstra={this.runDijkstra}
              resetGrid={this.resetGrid}
              appBarColor={colorMode}
              errorStatus={errorStatus}
            />
          </div>
          <div className="legend">
            <Legend />
          </div>
          <div
            className="grid"
            onKeyDown={e => this.handleOnKeyDown(e)}
            onMouseLeave={this.handleOnMouseLeave}
            onMouseUp={this.handleNodeOnMouseUp}
          >
            {grid.map((row, rowIdx) => {
              return (
                <div className="row" id={`row-${rowIdx}`} key={rowIdx}>
                  {row.map(node => {
                    return node;
                  })}
                </div>
              );
            })}
          </div>
          <div className="snackbar">
            <StyledSnackbar
              msg={snackbarMsg}
              shiftMode={shiftKeyMode}
              ctrlMode={ctrlKeyMode}
              openStatus={shiftKeyMode || ctrlKeyMode}
            />
          </div>
        </>
      );
    }
  }
}
