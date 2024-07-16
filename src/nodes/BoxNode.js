import React, { useState, useEffect, useContext } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function BoxNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [pointA, setPointA] = useState(data.pointA || [0, 0, 0]);
  const [pointB, setPointB] = useState(data.pointB || [0, 0, 0]);

  useEffect(() => {
    edges.forEach((edge) => {
      if (edge.target === id) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'point') {
          if (edge.targetHandle === 'pointA') {
            setPointA([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          } else if (edge.targetHandle === 'pointB') {
            setPointB([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          }
        }
      }
    });
  }, [edges, nodes, id]);

  useEffect(() => {
    updateNodeValue(id, 'pointA', pointA);
    updateNodeValue(id, 'pointB', pointB);
  }, [pointA, pointB, id, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <div>Box Node</div>
      <div>Point A</div>
      <div>Point B</div>
      <Handle type="target" position="left" id="pointA" style={{ top: 40 }} />
      <Handle type="target" position="left" id="pointB" style={{ top: 70 }} />
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default BoxNode;
