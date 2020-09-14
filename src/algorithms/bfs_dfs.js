export function bfs_dfs(grid, startNode, targetNode, name) {
  debugger;
  let graphNodes = initGraphNodes(grid, startNode.props.nodeNum);
  const startGraphNode = graphNodes[startNode.props.nodeNum];
  let nodeQueue = [startGraphNode];
  let visitedNodesInOrder = [];
  while (nodeQueue.length) {
    const currentNode = nodeQueue.shift();
    if (currentNode.props.isWall) continue;
    if (currentNode.distance === Infinity) return visitedNodesInOrder;
    visitedNodesInOrder.push(currentNode);
    if (currentNode.props.nodeNum === targetNode.props.nodeNum)
      return visitedNodesInOrder;
    const neighborNodes = getUnvisitedNeighbors(currentNode, graphNodes, grid);
    for (const neighbor of neighborNodes) {
      neighbor.isVisited = true;
      neighbor.distance = currentNode.distance + 1;
      neighbor.previousNode = currentNode;
      nodeQueue.push(neighbor);
    }
  }
}

function initGraphNodes(grid, startNodeNum) {
  const graphNodes = [];
  for (const row of grid) {
    for (const node of row) {
      var newGraphNode = null;
      if (node.props.nodeNum === startNodeNum) {
        newGraphNode = {
          ...node,
          isVisited: true,
          distance: 0,
          previousNode: null
        };
      } else {
        newGraphNode = {
          ...node,
          isVisited: false,
          distance: Infinity,
          previousNode: null
        };
      }
      graphNodes.push(newGraphNode);
    }
  }
  return graphNodes;
}

function getUnvisitedNeighbors(node, graphNodes, grid) {
  let neighbors = [];
  const { row, col } = node.props;
  // top neighbor
  if (row > 0) neighbors.push(graphNodes[grid[row - 1][col].props.nodeNum]);
  // bottom
  if (row < grid.length - 1)
    neighbors.push(graphNodes[grid[row + 1][col].props.nodeNum]);
  // left
  if (col > 0) neighbors.push(graphNodes[grid[row][col - 1].props.nodeNum]);
  // right
  if (col < grid[0].length - 1)
    neighbors.push(graphNodes[grid[row][col + 1].props.nodeNum]);
  // updating neighbors within graph node grid
  return neighbors.filter(neighbor => !neighbor.isVisited);
}
