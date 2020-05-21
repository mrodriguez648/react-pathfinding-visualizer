import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra } from '../algorithms/dijkstra';

import { Button } from "@material-ui/core";

import './PathfindingVisualizer.css';

/*
TO-DO:
  IMPLEMENT SHORTEST PATH ANIMATION AFTER RUNNING AN ALG
  ADD WALL CREATION/DELETION FUNCTIONALITY FOR USER
  INTEGRATE LOGIC FOR DEALING WITH WALL NODES
*/

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
let ANIMATION_TIMEOUTS = [];

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      isVisualizing: false
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown = (row, col) => {
    console.log("Mouse down");
  }

  handleMouseEnter = (row, col) => {
    console.log("Mouse entered");
  }

  handleMouseUp = () => {
    console.log("Mouse up");
  }

  resetGrid = () => {
    const grid = getInitialGrid();
    for (var i = 0; i < ANIMATION_TIMEOUTS.length; i++) {
      clearTimeout(ANIMATION_TIMEOUTS[i]);
    }
    ANIMATION_TIMEOUTS = [];
    this.setState({ grid: grid, isVisualizing: false });
  }

  runDijkstra = () => {
    if(this.state.isVisualizing) return;
    this.setState({ isVisualizing: true });
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const targetNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];   
    const visitedNodesInOrder = dijkstra(grid, startNode, targetNode);
    ANIMATION_TIMEOUTS = this.animateDijsktra(visitedNodesInOrder);
  }

  animateDijsktra(visitedNodesInOrder) {
    const timeouts = [];
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      timeouts.push(setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const newGrid = this.state.grid.slice();
        const newNode = 
        <Node
        key={node.key}
        row={node.props.row}
        col={node.props.col}
        isStart={node.props.isStart}
        isFinish={node.props.isFinish}
        isVisited={true}
        isWall={node.isWall}>
        </Node>
        newGrid[node.props.row][node.props.col] = newNode;
        this.setState({ grid: newGrid }); 
      }, 10 * i));
    }
    return timeouts;
  }

  render() {
    const {grid} = this.state;

    return (
      <>
      <div className="interface">
        <Button onClick={() => this.runDijkstra()}>
          Visualize Dijkstra's Algorithm
        </Button>
        <Button onClick={() => this.resetGrid()}>
          Reset Grid
        </Button>
      </div>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
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

const getInitialGrid = () => {
  const grid = [];
  let nodeCount = 0;
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      const node = 
      <Node
        key={nodeCount}
        row={row}
        col={col}
        isStart={row === START_NODE_ROW && col === START_NODE_COL}
        isFinish={row === FINISH_NODE_ROW && col === FINISH_NODE_COL}
        isVisited={false}
        isWall={false}>
      </Node>
      currentRow.push(node);
      nodeCount += 1;
    }
    grid.push(currentRow);
  }
  return grid;
};

// const getNewGridWithWallToggled = (grid, row, col) => {
//   const newGrid = grid.slice();
//   const node = newGrid[row][col];
//   const newNode = {
//     ...node,
//     isWall: !node.isWall,
//   };
//   newGrid[row][col] = newNode;
//   return newGrid;
// };