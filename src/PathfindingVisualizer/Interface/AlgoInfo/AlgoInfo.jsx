import React from "react";
import AlgoInfoCard from "./AlgoInfoCard";
import AlgoInfoDialog from "./AlgoInfoDialog";

const ALGO_INFO = [
  [
    "Dijstrka's",
    "Edsger W. Dijstrka (1956)",
    "Dijkstra's algorithm finds the shortest path between two points in a graph network. It picks the unvisited vertex with the lowest distance, calculates the distance through it to each unvisited neighbor, and updates the neighbor's distance if smaller.",
    "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. All unvisited nodes have a initial distance of infinity from the start node. For every iteration of the algorithm, the neighbors (adjacent nodes) of the currently visited node are labeled as visited (), and their distances are updated accordingly. This distance is calculated as the sum total distance from the start node to the currently visited node + the distance from the currently visited node to the neighbor. Along with being labeled as visited, the currently visited node is stored as the previous node in relation to the neighbor. This allows us to backtrack and find reference the nodes that make up the shortest path."
  ],
  [
    "Breadth-first Search",
    "Konrad Zuse (1945)",
    "Breadth-first search is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root, and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
    "BFS and its application in finding connected components of graphs were invented in 1945 by Konrad Zuse, in his (rejected) Ph.D. thesis on the Plankalkül programming language (the first high-level programming language), but this was not published until 1972. It was reinvented in 1959 by Edward F. Moore, who used it to find the shortest path out of a maze,[4][5] and later developed by C. Y. Lee into a wire routing algorithm (published 1961)."
  ]
];

export default function AlgoInfoController(props) {
  const { algoIdx } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const setOpenDialogCallback = () => {
    setOpenDialog(!openDialog);
  };
  return (
    <>
      <AlgoInfoCard
        algoIdx={algoIdx}
        algoInfo={ALGO_INFO}
        openAlgoInfoDialogCallback={setOpenDialogCallback}
      />
      <AlgoInfoDialog
        openProp={openDialog}
        algoIdx={algoIdx}
        algoInfo={ALGO_INFO}
        openAlgoInfoDialogCallback={setOpenDialogCallback}
      />
    </>
  );
}
