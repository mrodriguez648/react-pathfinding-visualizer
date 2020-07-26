export function dijkstra(grid, startNode, targetNode) {
  const visitedNodesInOrder = [];
  const graphNodes = initGraphNodes(grid);
  const unvisitedGraphNodes = graphNodes.slice();
  unvisitedGraphNodes[startNode.props.nodeNum].distance = 0;
  while (!!unvisitedGraphNodes.length) {
    sortNodesByDistance(unvisitedGraphNodes);
    const closestNode = unvisitedGraphNodes.shift();
    // If we encounter a wall, we skip it
    if (closestNode.props.isWall) continue;
    // If the closest node is at a distance of infinity after being sorted,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode.props.nodeNum === targetNode.props.nodeNum) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, graphNodes, grid);
  }
}

// Initialize graph node structure
function initGraphNodes(grid) {
  const unvisitedNodes = [];
  for (const row of grid) {
    for (const node of row) {
      const newNode = {
        ...node,
        isVisited: false,
        distance: Infinity,
        previousNode: null
      }
      unvisitedNodes.push(newNode);
    }
  }
  return unvisitedNodes;
}

// Sort call used to update minimum node within unvisited nodes data structure
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => 
    nodeA.distance - nodeB.distance
  );
}

// Updates adjacent nodes to reflect current distance and store previously connected node within current shortest path
function updateUnvisitedNeighbors(node, graphNodes, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, graphNodes, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

// Retrieve adjacent graph nodes that have not been marked as visited
function getUnvisitedNeighbors(node, graphNodes, grid) {
  const neighbors = [];
  const {row, col} = node.props;
  debugger;
  // top neighbor
  if (row > 0) neighbors.push(graphNodes[grid[row - 1][col].props.nodeNum]);
  // bottom
  if (row < grid.length - 1) neighbors.push(graphNodes[grid[row + 1][col].props.nodeNum]);
  // left
  if (col > 0) neighbors.push(graphNodes[grid[row][col - 1].props.nodeNum]);
  // right
  if (col < grid[0].length - 1) neighbors.push(graphNodes[grid[row][col + 1].props.nodeNum]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}