import React, { useEffect, useContext, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function AdditionNode({ id, data }) {
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
        updateNodeValue(id, 'x', 0);
      }

      if (!foundY) {
        updateNodeValue(id, 'y', 0);
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
      <div>Addition Node</div>
      <div>X: {data.x || 0}</div>
      <div>Y: {data.y || 0}</div>
      <div>Result: {(data.x || 0) + (data.y || 0)}</div>
      <Handle type="target" position="left" id="x" style={{ top: 20 }} />
      <Handle type="target" position="left" id="y" style={{ top: 60 }} />
      <Handle type="source" position="right" id="result" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default AdditionNode;
