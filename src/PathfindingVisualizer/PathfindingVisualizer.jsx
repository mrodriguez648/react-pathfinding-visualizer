import React, { Component } from 'react';
import Node from './Node/Node';
import SelectedMenu from './SelectedMenu';
import { dijkstra } from '../algorithms/dijkstra';
import { Button, AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import './PathfindingVisualizer.css';

const ROW_COUNT = 15;
const COL_COUNT = 25;
const START_NODE_ROW = Math.floor(Math.random() * ROW_COUNT);
const START_NODE_COL = Math.floor(Math.random() * COL_COUNT);
var FINISH_NODE_ROW = Math.floor(Math.random() * ROW_COUNT);
while(FINISH_NODE_ROW === START_NODE_ROW) {
  FINISH_NODE_ROW = Math.floor(Math.random() * ROW_COUNT);
}
var FINISH_NODE_COL = Math.floor(Math.random() * COL_COUNT);
while(FINISH_NODE_COL === START_NODE_COL) {
  FINISH_NODE_COL = Math.floor(Math.random() * COL_COUNT);
}

let ANIMATION_TIMEOUTS = [];

const ALGO_NAMES = [
  'Dijstrka\'s',
  'A* Search',
  'BFS',
  'DFS'
]

const StyledButton = withStyles({
  root: {
    outline: '2px solid white',
    borderRadius: 3,
    border: 1,
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '0 25px',
    '&$disabled': { color: 'red' },
  },
  disabled: {},
})(Button);

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.initGrid(),
      selectedAlgo: ALGO_NAMES[0],
      isShiftKeyPressed: false,
      isCtrlKeyPressed: false,
      isMouseDown: false,
      isVisualizing: false
    };
  }

  updateWallNode = (row, col, newWallProp) => {
    const newGrid = this.state.grid;
    const oldNode = newGrid[row][col];
    const updatedNode = React.cloneElement(
      oldNode,
      {isWall: newWallProp}
    )
    newGrid[row][col] = updatedNode;
    this.setState({ grid: newGrid });
  }

  setSelectedAlgo = (algoIndex) => {
    this.setState({ selectedAlgo: ALGO_NAMES[algoIndex] })
  }

  // Backtracks from the targetNode to find the shortest path.
  // Only works when called after a graph alg
  getNodesInShortestPathOrder = (targetGraphNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = targetGraphNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  handleOnKeyDown = (e) => {
    console.log("onKeyDown fired");
    switch(e.keyCode) {
      case 16:
        if(!this.state.isCtrlKeyPressed) {
          this.setState({ isShiftKeyPressed: !this.state.isShiftKeyPressed });
        }
        break;
      case 17:
        if(!this.state.isShiftKeyPressed) {
          this.setState({ isCtrlKeyPressed: !this.state.isCtrlKeyPressed });
        }
        break;
      default:
    }
  }

  handleOnKeyUp = (e) => {
    console.log("onKeyUp fired");
    switch(e.keyCode) {
      case 16:
        if(!this.state.isCtrlKeyPressed) {
          this.setState({ isShiftKeyPressed: !this.state.isShiftKeyPressed });
        }
        break;
      case 17:
        if(!this.state.isShiftKeyPressed) {
          this.setState({ isCtrlKeyPressed: !this.state.isCtrlKeyPressed });
        }
        break;
      default:
    }
  }

  handleOnMouseDown = () => {
    console.log("mouseDown fired");
    this.setState({ mouseIsPressed: !this.state.mouseIsPressed });
  }

  handleOnMouseEnter = (row, col, isWallState) => {
    if 
    ((this.state.isShiftKeyPressed && !isWallState) || (this.state.isCtrlKeyPressed && isWallState)) {
      this.updateWallNode(row, col, !isWallState);
    }
  }
  
  initGrid = () => {
    const grid = [];
    let nodeCount = 0;
    for (let row = 0; row < ROW_COUNT; row++) {
      const currentRow = [];
      for (let col = 0; col < COL_COUNT; col++) {
        const node = 
        <Node
          key={nodeCount}
          nodeNum={nodeCount}
          row={row}
          col={col}
          isStart={row === START_NODE_ROW && col === START_NODE_COL}
          isFinish={row === FINISH_NODE_ROW && col === FINISH_NODE_COL}
          isGraphNode={false}
          isShortestPathNode={false}
          isWall={false}
          updateWallNode={this.updateWallNode}
          onMouseEnter={this.handleOnMouseEnter}>
        </Node>
        currentRow.push(node);
        nodeCount += 1;
      }
      grid.push(currentRow);
    }
    return grid;
  };

  resetGrid = () => {
    // clear in progress and queued animations
    for (let i = 0; i < ANIMATION_TIMEOUTS.length; i++) {
      clearTimeout(ANIMATION_TIMEOUTS[i]);
    }
    const newGrid = this.initGrid();
    ANIMATION_TIMEOUTS = [];
    this.setState({ grid: newGrid, isVisualizing: false });
  }

  runDijkstra = () => {
    this.setState({ isVisualizing: true });
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];   
    const visitedGraphNodesInOrder = dijkstra(grid, startNode, targetNode);
    const [targetGraphNode] = visitedGraphNodesInOrder.slice(-1);
    const shortestPathGraphNodes = this.getNodesInShortestPathOrder(targetGraphNode);
    ANIMATION_TIMEOUTS = this.animateDijsktra(visitedGraphNodesInOrder, shortestPathGraphNodes);
  }

  animateDijsktra = (visitedNodesInOrder, shortestPathGraphNodes) => {
    const timeouts = [];
    let t = 0;
    // animate graph nodes traversed by algo
    for (let i = 0; i < visitedNodesInOrder.length; i++, t++) {
      timeouts.push(setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = this.state.grid;
        const newNode = React.cloneElement(
          node,
          {isGraphNode: true}
        );
        newGrid[node.props.row][node.props.col] = newNode;
        this.setState({ grid: newGrid });
      }, 15 * t));
    }

    // animate shortest path obtained through backwards propegation
    for (let i = 0; i < shortestPathGraphNodes.length; i++, t++) {
      timeouts.push(setTimeout(() => {
        const node = shortestPathGraphNodes[i];
        const newGrid = this.state.grid;
        const newNode = React.cloneElement(
          node,
          {isShortestPathNode: true}
        );
        newGrid[node.props.row][node.props.col] = newNode;
        this.setState({ grid: newGrid }); 
      }, 20 * t));
    }
    return timeouts;
  }

  testButtonFunct = () => {
    const baseNode = this.state.grid[0][0];
    console.log("test funct node", baseNode);
    const newNode = React.cloneElement(
      baseNode,
      {isGraphNode: true}
    );
    console.log("test funct new node", newNode);
  }

  render() {
    const { grid, isVisualizing, selectedAlgo } = this.state;
    return (
      <>
      <div className="interface">
        <AppBar position="static">
          <Toolbar>
            <Typography align="left" variant="h5">
              Pathfinding Visualizer
            </Typography>
            <SelectedMenu options={ALGO_NAMES} changeAlgo={this.setSelectedAlgo}/>
            <StyledButton onClick={this.runDijkstra} disabled={isVisualizing}>
              Run {selectedAlgo}
            </StyledButton>
            <StyledButton onClick={this.resetGrid}>
              Reset Grid
            </StyledButton>
          </Toolbar>
        </AppBar>
      </div>
      <div className="grid" 
      onKeyDown={(e) => this.handleOnKeyDown(e)} 
      onKeyUp={(e) => this.handleOnKeyUp(e)}
      onMouseDown={(e) => this.handleOnMouseDown(e)}>
        {grid.map((row, rowIdx) => {
          return (
            <div id={`row-${rowIdx}`} key={rowIdx}>
              {row.map((node) => {
                return node;
              })}
            </div>
          );
        })}
      </div>
      </>
    );
  }
}