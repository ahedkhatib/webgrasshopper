import React, { useEffect, useContext, useState } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function DistanceNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [pointA, setPointA] = useState(data.pointA || [0, 0, 0]);
  const [pointB, setPointB] = useState(data.pointB || [0, 0, 0]);
  const [distance, setDistance] = useState(data.distance || 0);

  const computeDistance = (pointA, pointB) => {
    return Math.sqrt(
      Math.pow(pointA[0] - pointB[0], 2) +
      Math.pow(pointA[1] - pointB[1], 2) +
      Math.pow(pointA[2] - pointB[2], 2)
    );
  };

  useEffect(() => {
    const connectedEdges = edges.filter(edge => edge.target === id);
    connectedEdges.forEach((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      if (sourceNode && sourceNode.type === 'point') {
        if (edge.targetHandle === 'pointA') {
          setPointA([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          updateNodeValue(id, 'pointA', [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
        } else if (edge.targetHandle === 'pointB') {
          setPointB([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          updateNodeValue(id, 'pointB', [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
        }
      }
    });
    const dist = computeDistance(pointA, pointB);
    setDistance(dist);
    updateNodeValue(id, 'distance', dist);

    if (connectedEdges.length === 0) {
      setPointA([0, 0, 0]);
      setPointB([0, 0, 0]);
      setDistance(0);
      updateNodeValue(id, 'pointA', [0, 0, 0]);
      updateNodeValue(id, 'pointB', [0, 0, 0]);
      updateNodeValue(id, 'distance', 0);
    }
  }, [edges, nodes, id, pointA, pointB, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="pointA" style={{ left: 0, top: '30%' }} />
      <Handle type="target" position="left" id="pointB" style={{ left: 0, top: '70%' }} />
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
