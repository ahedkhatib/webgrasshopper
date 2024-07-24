import React, { useEffect, useContext, useState } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function XYPlaneNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [origin, setOrigin] = useState(data.origin || [0, 0, 0]);

  useEffect(() => {
    const connectedEdges = edges.filter(edge => edge.target === id && edge.targetHandle === 'origin');
    if (connectedEdges.length > 0) {
      connectedEdges.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'point') {
          setOrigin([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          updateNodeValue(id, 'origin', [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
        }
      });
    } else {
      setOrigin([0, 0, 0]);
      updateNodeValue(id, 'origin', [0, 0, 0]);
    }
  }, [edges, nodes, id, updateNodeValue]);

  useEffect(() => {
    const plane = {
      origin,
      normal: [0, 0, 1],
    };
    updateNodeValue(id, 'plane', plane);
  }, [origin, id, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="origin" style={{ left: 0, top: '50%' }} />
      <div className={styles.xyPlaneNode}>
        <div>Origin: {origin.join(', ')}</div>
        <div>Plane: {data.plane ? `Origin: ${data.plane.origin.join(', ')}, Normal: ${data.plane.normal.join(', ')}` : ''}</div>
      </div>
      <Handle type="source" position="right" id="plane" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default XYPlaneNode;
