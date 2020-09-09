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
    "A* Search",
    "Peter Hart, Nils Nilsson and Bertram Raphael",
    "wtf is A* search",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem hic asperiores eum possimus veritatis nobis quod distinctio soluta, iure a quam quis accusantium in explicabo. Dignissimos, assumenda! Nam, exercitationem hic. Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt voluptatem similique, reiciendis fugiat rem et, aut voluptatibus laborum ipsa, quae optio consequuntur debitis ex minima. Quis quam quod eligendi iure."
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
        algoIdx={algoIdx}
        algoInfo={ALGO_INFO}
        openProp={openDialog}
        openAlgoInfoDialogCallback={setOpenDialogCallback}
      />
    </>
  );
}
