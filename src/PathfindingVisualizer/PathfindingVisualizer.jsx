import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra } from '../algorithms/dijkstra';
import { Button } from "@material-ui/core";

import './PathfindingVisualizer.css';

/*
TO-DO:
  INTEGRATE LOGIC FOR DEALING WITH WALL NODES
*/

const ROW_COUNT = 20;
const COL_COUNT = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 25;
let ANIMATION_TIMEOUTS = [];

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.initGrid(),
      isVisualizing: false
    };
  }

  updateWallNode = (row, col, isWallProp) => {
    const newGrid = this.state.grid;
    const oldNode = newGrid[row][col];
    const updatedNode = React.cloneElement(
      oldNode,
      {isWall: !isWallProp}
    )
    newGrid[row][col] = updatedNode;
    this.setState({ grid: newGrid });
  }

  handleOnMouseEnter = () => {
    console.log("mouseEnter");
    // if (this.props.isStart || this.props.isFinish) return null;
    // this.props.updateWallNode(this.props.row, this.props.col, this.props.isWall);
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
          row={row}
          col={col}
          isStart={row === START_NODE_ROW && col === START_NODE_COL}
          isFinish={row === FINISH_NODE_ROW && col === FINISH_NODE_COL}
          isGraphNode={false}
          isShortestPathNode={false}
          isWall={false}
          updateWallNode={this.updateWallNode} 
          onMouseOver={this.handleOnMouseEnter}>
        </Node>
        currentRow.push(node);
        nodeCount += 1;
      }
      grid.push(currentRow);
    }
    return grid;
  };

  resetGrid = () => {
    console.log("resetGrid");
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

    // animate shortest path
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

  testFunct = () => {
    const baseNode = this.state.grid[0][0]
    console.log("test funct node", baseNode);
    const newNode = React.cloneElement(
      baseNode,
      {isGraphNode: true}
    );
    console.log("test funct new node", newNode);
  }

  render() {
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
        <Button onClick={() => this.testFunct()}>
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