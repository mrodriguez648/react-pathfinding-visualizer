import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer'

function App() {
  return (  
    <div className="App">
      <PathfindingVisualizer
      rowCount={15}
      colCount={25}
      startNodeRow={
        Math.floor(Math.random() * 15)
      }
      startNodeCol={
        Math.floor(Math.random() * 25)
      }
      targetNodeRow={
        Math.floor(Math.random() * 15)
      }
      targetNodeCol={
        Math.floor(Math.random() * 25)
      }
      />
    </div>
  );
}

export default App;
