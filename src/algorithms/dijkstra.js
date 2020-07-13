// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path by backtracking from the finish node.

export function dijkstra(grid, startNode, targetNode) {
  const visitedNodesInOrder = [];
  const graphNodes = initGraphNodes(grid);
  const unvisitedGraphNodes = graphNodes.slice();
  unvisitedGraphNodes[startNode.key].distance = 0;
  while (!!unvisitedGraphNodes.length) {
    sortNodesByDistance(unvisitedGraphNodes);
    const closestNode = unvisitedGraphNodes.shift();
    // If we encounter a wall, we skip it
    if (closestNode.props.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode.key === targetNode.key) {
      return visitedNodesInOrder;
    }
    updateUnvisitedNeighbors(closestNode, graphNodes, grid);
  }
}

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

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => 
    nodeA.distance - nodeB.distance
  );
}

function updateUnvisitedNeighbors(node, graphNodes, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, graphNodes, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, graphNodes, grid) {
  const neighbors = [];
  const {row, col} = node.props;
  // top neighbor
  if (row > 0) neighbors.push(graphNodes[grid[row - 1][col].key]);
  // bottom
  if (row < grid.length - 1) neighbors.push(graphNodes[grid[row + 1][col].key]);
  // left
  if (col > 0) neighbors.push(graphNodes[grid[row][col - 1].key]);
  // right
  if (col < grid[0].length) neighbors.push(graphNodes[grid[row][col + 1].key]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
