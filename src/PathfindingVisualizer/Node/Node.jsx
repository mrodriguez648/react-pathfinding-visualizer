import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.isVisited !== nextProps.isVisited);
  }

  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isVisited,
      isWall,
    } = this.props;
		
    const extraClassName = 
    isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isVisited
    ? 'node-visited'
    : isWall
    ? 'node-wall'
    : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}></div>
    );
  }
}