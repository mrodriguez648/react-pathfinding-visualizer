import React from "react";
import NodePopover from "./Popover";

const NODE_MSGS = [
  "Empty node that the algorithm can traverse through. You can place start/target/wall nodes within it.",
  "Where the algorithm will begin its search. Click and drag to reposition onto vacant node.",
  "Where the algorithm will end its search, if reachable. Can be repositioned through click and drag onto vacant node.",
  "Node that algorithm cannot traverse through. Press CTRL to enter wall building mode. Press SHIFT to enter wall deletion mode. Search will continue only through vacant nodes until target node is reached or all other paths are traversed.",
  "Graph node that the algorithm has traversed through and visited. Can be part of the shortest path node.",
  "If target node was reached, these nodes represent the shortest path available to reach it from the start node."
];

function LegendWithPopovers() {
  return (
    <ul>
      <li>
        <p>Vacant Node</p>
        <NodePopover msg={NODE_MSGS[0]} transformOriginHorizontal="left" />
      </li>
      <li>
        <p>Start Node</p>
        <NodePopover
          nodeType="node-start"
          msg={NODE_MSGS[1]}
          transformOriginHorizontal="left"
        />
      </li>
      <li>
        <p>Target Node</p>
        <NodePopover
          nodeType="node-target"
          msg={NODE_MSGS[2]}
          transformOriginHorizontal="left"
        />
      </li>
      <li>
        <p>Wall Node</p>
        <NodePopover
          nodeType="node-wall"
          msg={NODE_MSGS[3]}
          transformOriginHorizontal="right"
        />
      </li>
      <li>
        <p>Visited Node</p>
        <NodePopover
          nodeType="node-graph"
          msg={NODE_MSGS[4]}
          transformOriginHorizontal="right"
        />
      </li>
      <li>
        <p>Shortest Path Node</p>
        <NodePopover
          nodeType="node-shortest-path"
          msg={NODE_MSGS[5]}
          transformOriginHorizontal="right"
        />
      </li>
    </ul>
  );
}

export default React.memo(LegendWithPopovers);
