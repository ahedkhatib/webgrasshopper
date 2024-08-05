import React, { useEffect, useContext, useState, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';


function DistanceNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [pointA, setPointA] = useState(data.pointA || [0, 0, 0]);
  const [pointB, setPointB] = useState(data.pointB || [0, 0, 0]);
  const [distance, setDistance] = useState(data.distance || 0);
  const prevEdgesRef = useRef(edges);
  const prevNodesRef = useRef(nodes);

  const computeDistance = (pointA, pointB) => {
    return Math.sqrt(
      Math.pow(pointA[0] - pointB[0], 2) +
      Math.pow(pointA[1] - pointB[1], 2) +
      Math.pow(pointA[2] - pointB[2], 2)
    );
  };

  useEffect(() => {
    const updatePointsAndDistances = () => {
      let foundPointA = false;
      let foundPointB = false;

      edges.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'point') {
          if (edge.targetHandle === 'pointA') {
            setPointA([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
            updateNodeValue(id, 'pointA', [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
            foundPointA = true;
      } else if (edge.targetHandle === 'pointB') {
          setPointB([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          updateNodeValue(id, 'pointB', [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          foundPointB = true;
      }
    }
  }); 
  
  if(!foundPointA) {
    setPointA([0, 0, 0]);
    updateNodeValue(id, 'pointA', [0, 0, 0]);
  }

  if(!foundPointB) {
    setPointB([0, 0, 0]);
    updateNodeValue(id, 'pointB', [0, 0, 0]);
  }

    const dist = computeDistance(pointA, pointB);
    setDistance(dist);
    updateNodeValue(id, 'distance', dist);
};

  const prevEdges = prevEdgesRef.current;
  const prevNodes = prevNodesRef.current;

  if (
    JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
    JSON.stringify(nodes) !== JSON.stringify(prevNodes)
  )
   {
    updatePointsAndDistances();
   }

   prevEdgesRef.current = edges;
   prevNodesRef.current = nodes;

  }, [edges, nodes, id, pointA, pointB, updateNodeValue]);
  

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="pointA" style={{ left: 0, top: '20%' }} />
      <Handle type="target" position="left" id="pointB" style={{ left: 0, top: '50%' }} />
      <div className={styles.distanceNode}>
        <div>Point A: {pointA.join(', ')}</div>
        <div>Point B: {pointB.join(', ')}</div>
        <div>Distance: {distance}</div>
      </div>
      <Handle type="source" position="right" id="distance" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default DistanceNode;
