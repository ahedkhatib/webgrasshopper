import React, { useEffect, useContext, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function MultiplicationNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const prevEdgesRef = useRef(edges);
  const prevNodesRef = useRef(nodes);

  useEffect(() => {
    const updateValues = () => {
      let foundX = false;
      let foundY = false;

      edges.forEach((edge) => {
        if (edge.target === id && edge.targetHandle === 'x') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode) {
            if (data.x !== sourceNode.data.value) {
              updateNodeValue(id, 'x', sourceNode.data.value);
            }
            foundX = true;
          }
        } else if (edge.target === id && edge.targetHandle === 'y') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode) {
            if (data.y !== sourceNode.data.value) {
              updateNodeValue(id, 'y', sourceNode.data.value);
            }
            foundY = true;
          }
        }
      });

      if (!foundX) {
        updateNodeValue(id, 'x', 1);
      }

      if (!foundY) {
        updateNodeValue(id, 'y', 1);
      }
    };

    const prevEdges = prevEdgesRef.current;
    const prevNodes = prevNodesRef.current;

    if (
      JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
      JSON.stringify(nodes) !== JSON.stringify(prevNodes)
    ) {
      updateValues();
    }

    prevEdgesRef.current = edges;
    prevNodesRef.current = nodes;
  }, [edges, nodes, id, data.x, data.y, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <div>Mul Node</div>
      <div>X: {data.x !== undefined ? data.x : 1}</div>
      <div>Y: {data.y !== undefined ? data.y : 1}</div>
      <div>Result: {(data.x !== undefined ? data.x : 1) * (data.y !== undefined ? data.y : 1)}</div>
      <Handle type="target" position="left" id="x" style={{ top: 45 }} />
      <Handle type="target" position="left" id="y" style={{ top: 70 }} />
      <Handle type="source" position="right" id="result" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default MultiplicationNode;
