import React, { useEffect, useContext, useState, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function PointNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [x, setX] = useState(data.x || 0);
  const [y, setY] = useState(data.y || 0);
  const [z, setZ] = useState(data.z || 0);
  const prevEdgesRef = useRef(edges);
  const prevNodesRef = useRef(nodes);

  useEffect(() => {
    const updateCoordinates = () => {
      let foundX = false;
      let foundY = false;
      let foundZ = false;

      edges.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'custom') {
          if (edge.target === id && edge.targetHandle === 'x') {
            setX(sourceNode.data.value);
            updateNodeValue(id, 'x', sourceNode.data.value);
            foundX = true;
          } else if (edge.target === id && edge.targetHandle === 'y') {
            setY(sourceNode.data.value);
            updateNodeValue(id, 'y', sourceNode.data.value);
            foundY = true;
          } else if (edge.target === id && edge.targetHandle === 'z') {
            setZ(sourceNode.data.value);
            updateNodeValue(id, 'z', sourceNode.data.value);
            foundZ = true;
          }
        }
      });

      if (!foundX) {
        setX(0);
        updateNodeValue(id, 'x', 0);
      }
      if (!foundY) {
        setY(0);
        updateNodeValue(id, 'y', 0);
      }
      if (!foundZ) {
        setZ(0);
        updateNodeValue(id, 'z', 0);
      }
    };

    const prevEdges = prevEdgesRef.current;
    const prevNodes = prevNodesRef.current;

    if (
      JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
      JSON.stringify(nodes) !== JSON.stringify(prevNodes)
    ) {
      updateCoordinates();
    }

    prevEdgesRef.current = edges;
    prevNodesRef.current = nodes;
  }, [edges, nodes, id, updateNodeValue]);

  /*useEffect(() => {
    if (x !== data.x || y !== data.y || z !== data.z) {
      updateNodeValue(id, 'x', x);
      updateNodeValue(id, 'y', y);
      updateNodeValue(id, 'z', z);
    }
  }, [x, y, z, id, updateNodeValue, data.x, data.y, data.z]);*/

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="top" id="x" style={{ left: 0, top: 20 }} />
      <Handle type="target" position="top" id="y" style={{ left: 0, top: 40 }} />
      <Handle type="target" position="top" id="z" style={{ left: 0, top: 60 }} />
      <div>
        <div>X: {x}</div>
        <div>Y: {y}</div>
        <div>Z: {z}</div>
      </div>
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default PointNode;