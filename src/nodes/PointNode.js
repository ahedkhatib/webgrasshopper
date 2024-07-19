import React, { useEffect, useContext, useState } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function PointNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [prevData, setPrevData] = useState({ x: data.x, y: data.y, z: data.z });

  useEffect(() => {
    if (prevData.x !== data.x || prevData.y !== data.y || prevData.z !== data.z) {
      edges.forEach((edge) => {
        if (edge.source === id) {
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (targetNode && targetNode.type === 'line') {
            const targetHandle = edge.targetHandle;
            if (targetHandle.startsWith('input')) {
              const inputIndex = targetHandle === 'input1' ? 1 : 2;
              updateNodeValue(targetNode.id, `x${inputIndex}`, data.x);
              updateNodeValue(targetNode.id, `y${inputIndex}`, data.y);
              updateNodeValue(targetNode.id, `z${inputIndex}`, data.z);
            }
          }
          if (targetNode && targetNode.type === 'circle') {
            const targetHandle = edge.targetHandle;
            if (targetHandle === 'plane') {
              updateNodeValue(targetNode.id, `plane`, [data.x, data.y, data.z]);
            }
          }
          if (targetNode && targetNode.type === 'box') {
            const targetHandle = edge.targetHandle;
            if (targetHandle === 'pointA') {
              updateNodeValue(targetNode.id, `pointA`, [data.x, data.y, data.z]);
            }
            if (targetHandle === 'pointB') {
              updateNodeValue(targetNode.id, `pointB`, [data.x, data.y, data.z]);
            }
          }
          if (targetNode && targetNode.type === 'sphere') {
            const targetHandle = edge.targetHandle;
            if (targetHandle === 'center') {
              updateNodeValue(targetNode.id, `center`, [data.x, data.y, data.z]);
            }
          }
        }
      });
      setPrevData({ x: data.x, y: data.y, z: data.z });
    }
  }, [data.x, data.y, data.z, edges, id, nodes, updateNodeValue, prevData]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="top" id="x" style={{ left: 0, top: 20 }} />
      <Handle type="target" position="top" id="y" style={{ left: 0, top: 40 }} />
      <Handle type="target" position="top" id="z" style={{ left: 0, top: 60 }} />
      <div>
        <div>X: {data.x || 0}</div>
        <div>Y: {data.y || 0}</div>
        <div>Z: {data.z || 0}</div>
      </div>
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default PointNode;