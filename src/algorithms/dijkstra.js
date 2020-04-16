function dijkstra(
  nodes,
  start,
  target,
  nodesToAnimate,
  boardArray,
  name,
  heuristic
) {
  if (!start || !target || start === target) {
    return false;
  }
  nodes[start].distance = 0;
  nodes[start].direction = "right";
  let unvisitedNodes = Object.keys(nodes);
  while (unvisitedNodes.length) {
    let cNode = getClosestNode(nodes, unvisitedNodes);
    // TO-DO: HANDLE WALLS LATER
    // while (cNode.status === "wall" && unvisitedNodes.length) {
    //   cNode = getClosestNode(nodes, unvisitedNodes);
    // }
    if (cNode.distance === Infinity) {
      return false;
    }
    // TO-DO: ANIMATE LATER
    // nodesToAnimate.push(cNode);
    cNode.status = "visited";
    if (cNode.id === target) return "success!";
    updateNeighbors(nodes, cNode, boardArray);
  }
}

function getClosestNode(nodes, unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  return unvisitedNodes.unshift();
}
