import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isVisited,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isVisited
      ? 'node-visited'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={(row, col) => onMouseDown(row, col)}
        onMouseEnter={(row, col) => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}  ></div>
    );
  }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0
};