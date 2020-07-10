import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.isGraphNode !== nextProps.isGraphNode) ||
      (this.props.isShortestPathNode !== nextProps.isShortestPathNode) ||
      (this.props.isWall !== nextProps.isWall)
    );
  }

  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isGraphNode,
      isShortestPathNode,
      isWall,
      onMouseEnter: onMouseOver
    } = this.props;

    const stylingClassName = 
    isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : isShortestPathNode
    ? 'node-shortest-path'
    : isGraphNode
    ? 'node-graph'
    : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${stylingClassName}`}
        onMouseDown={this.handleOnMouseDown}
        onMouseOver={onMouseOver}>
      </div>
    );
  }

  /*
  HANDLE MOUSE EVENTS FOR CLICK AND DRAG WALL CREATION
  */

  // handleOnPointerEnter = () => {
  //   console.log("pointerEnter");
  // }

  handleOnMouseDown = () => {
    console.log("mouseDown");
    if (this.props.isStart || this.props.isFinish) return null;
    this.props.updateWallNode(this.props.row, this.props.col, this.props.isWall);
  }

  // handleOnMouseEnter = () => {
  //   console.log("mouseEnter");
  //   // if (this.props.isStart || this.props.isFinish) return null;
  //   // this.props.updateWallNode(this.props.row, this.props.col, this.props.isWall);
  // }

  // handleMouseEnter(row, col) {
  //   console.log("Mouse entered at", row, col);
  // }

  // handleMouseUp() {
  //   console.log("Mouse up");
  // }
}