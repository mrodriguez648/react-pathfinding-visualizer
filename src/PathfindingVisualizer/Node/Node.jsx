import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isGraphNode !== nextProps.isGraphNode ||
      this.props.isShortestPathNode !== nextProps.isShortestPathNode ||
      this.props.isWall !== nextProps.isWall
    );
  }

  render() {
    const {
      nodeNum,
      row,
      col,
      isStart,
      isTarget,
      isGraphNode,
      isShortestPathNode,
      isWall
    } = this.props;

    const stylingClassName = isTarget
      ? "node-target"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isShortestPathNode
      ? "node-shortest-path"
      : isGraphNode
      ? "node-graph"
      : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${stylingClassName}`}
        onMouseEnter={this.handleOnMouseEnter}
        onClick={this.handleOnClick}
        tabIndex={nodeNum}
      ></div>
    );
  }

  handleOnClick = () => {
    if (this.props.isStart || this.props.isTarget) return null;
    this.props.updateWallNode(
      this.props.row,
      this.props.col,
      !this.props.isWall
    );
  };

  handleOnMouseEnter = () => {
    if (this.props.isStart || this.props.isTarget) return null;
    this.props.onMouseEnter(this.props.row, this.props.col, this.props.isWall);
  };
}
