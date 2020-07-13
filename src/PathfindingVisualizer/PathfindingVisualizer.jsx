import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra } from '../algorithms/dijkstra';
import { Button } from "@material-ui/core";
import { AddBoxIcon } from '@material-ui/icons';

import './PathfindingVisualizer.css';

/*
TO-DO:
  INTEGRATE LOGIC FOR DEALING WITH WALL NODES
*/

const ROW_COUNT = 15;
const COL_COUNT = 20;
const START_NODE_ROW = 0;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 6;
const FINISH_NODE_COL = 10;
let ANIMATION_TIMEOUTS = [];

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.initGrid(),
      isShiftKeyPressed: false,
      isCtrlKeyPressed: false,
      isVisualizing: false
    };
  }

  updateWallNode = (row, col, isWallProp) => {
    console.log("updateWallNode called", row, col, isWallProp);
    const newGrid = this.state.grid;
    const oldNode = newGrid[row][col];
    const updatedNode = React.cloneElement(
      oldNode,
      {isWall: isWallProp}
    )
    newGrid[row][col] = updatedNode;
    this.setState({ grid: newGrid });
  }

  handleOnKeyDown = (e) => {
    console.log("onKeyDown fired", e);
    switch(e.keyCode) {
      case 16:
        if(!this.state.isCtrlKeyPressed) {
          console.log("shift key case");
          this.setState({ isShiftKeyPressed: !this.state.isShiftKeyPressed });
        }
        break;
      case 17:
        if(!this.state.isShiftKeyPressed) {
          console.log("ctrl key case");
          this.setState({ isCtrlKeyPressed: !this.state.isCtrlKeyPressed });
        }
        break;
      default:
    }
  }

  handleOnKeyUp = (e) => {
    console.log("onKeyUp fired", e);
    switch(e.keyCode) {
      case 16:
        if(!this.state.isCtrlKeyPressed) {
          console.log("shift key case");
          this.setState({ isShiftKeyPressed: !this.state.isShiftKeyPressed });
        }
        break;
      case 17:
        if(!this.state.isShiftKeyPressed) {
          console.log("ctrl key case");
          this.setState({ isCtrlKeyPressed: !this.state.isCtrlKeyPressed });
        }
        break;
      default:
    }
  }

  // handleOnMouseDown = () => {
  //   this.setState({ mouseIsPressed: !this.state.mouseIsPressed });
  // }

  handleOnMouseEnter = (row, col, isWallState) => {
    console.log("grid handleOnMouseEnter called");
    if (this.state.isShiftKeyPressed && !isWallState) {
      this.updateWallNode(row, col, !isWallState);
    }
    if (this.state.isCtrlKeyPressed && isWallState) {
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
          onKeyDown={this.handleOnKeyDown}
          onKeyUp={this.handleOnKeyUp}
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
    const shortestPathGraphNodes = getNodesInShortestPathOrder(targetGraphNode);
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
    const baseNode = this.state.grid[0][0]
    console.log("test funct node", baseNode);
    const newNode = React.cloneElement(
      baseNode,
      {isGraphNode: true}
    );
    console.log("test funct new node", newNode);
  }

  render() {
    console.log("grid render called, shiftPressed?, ctrlPressed?", this.state.isShiftKeyPressed, this.state.isCtrlKeyPressed);
    const grid = this.state.grid;
    return (
      <>
      <div className="interface">
        <Button 
        disabled={this.state.isVisualizing} 
        onClick={() => this.runDijkstra()}>
          Visualize Dijkstra's Algorithm
        </Button>
        <Button onClick={() => this.resetGrid()}>
          Reset Grid
        </Button>
        <Button onClick={() => this.testButtonFunct()}>
          Test
        </Button>
      </div>
      <div className="grid">
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

// Backtracks from the targetNode to find the shortest path.
// Only works when called after a graph alg
function getNodesInShortestPathOrder(targetGraphNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = targetGraphNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}