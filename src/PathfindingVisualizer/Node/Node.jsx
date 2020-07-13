import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {

  shouldComponentUpdate(nextProps) {
    return (
      (this.props.isGraphNode !== nextProps.isGraphNode) ||
      (this.props.isShortestPathNode !== nextProps.isShortestPathNode) ||
      (this.props.isWall !== nextProps.isWall)
    );
  }

  render() {
    console.log("node render called");
    const {
      nodeNum,
      row,
      col,
      isStart,
      isFinish,
      isGraphNode,
      isShortestPathNode,
      isWall,
      onKeyDown,
      onKeyUp
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
        onKeyDown={(e) => onKeyDown(e)}
        onKeyUp={(e) => onKeyUp(e)}
        onMouseEnter={(e) => this.handleOnMouseEnter(e)}
        onClick={this.handleOnClick}
        onDrag={(e) => this.handleOnDrag(e)}
        tabIndex={nodeNum}>
      </div>
    );
  }

  handleOnDrag(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  handleOnClick = () => {
    if (this.props.isStart || this.props.isFinish) return null;
    this.props.updateWallNode(this.props.row, this.props.col, !this.props.isWall);
  }

  handleOnMouseEnter = (e) => {
    e.stopPropagation();
    if (this.props.isStart || this.props.isFinish) return null;
    this.props.onMouseEnter(this.props.row, this.props.col, this.props.isWall);
  }

  // handleOnMouseOverCapture = () => {
  //   console.log("mouseOverCaptured");
  //   if (this.props.isStart || this.props.isFinish) return null;
  //   this.props.updateWallNode(this.props.row, this.props.col, this.props.isWall);
  // }
}