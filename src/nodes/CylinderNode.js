import React, { useState, useEffect, useContext } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function CylinderNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [radius, setRadius] = useState(data.radius || 1);
  const [height, setHeight] = useState(data.height || 1);
  const [center, setCenter] = useState(data.center || [0, 0, 0]);

  useEffect(() => {
    const connectedEdges = edges.filter(edge => edge.target === id && edge.targetHandle === 'radius');
    if (connectedEdges.length > 0) {
      connectedEdges.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'decimal') {
          setRadius(sourceNode.data.value);
          updateNodeValue(id, 'radius', sourceNode.data.value);
        }
      });
    } else {
      setRadius(0);
      updateNodeValue(id, 'radius', 0);
    }
    const connectedEdges2 = edges.filter(edge => edge.target === id && edge.targetHandle === 'height');
    if (connectedEdges2.length > 0) {
      connectedEdges2.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'decimal') {
          setHeight(sourceNode.data.value);
          updateNodeValue(id, 'height', sourceNode.data.value);
        }
      });
    } else {
      setHeight(0);
      updateNodeValue(id, 'height', 0);
    }
    const connectedEdges3 = edges.filter(edge => edge.target === id && edge.targetHandle === 'center');
    if (connectedEdges3.length > 0) {
      connectedEdges3.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'point') {
          setCenter([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
          updateNodeValue(id, 'center', [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
        }
      });
    } else {
      setCenter([0, 0, 0]);
      updateNodeValue(id, 'center', [0, 0, 0]);
    }
  }, [edges, nodes, id, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <div>Cylinder Node</div>
      <div>Radius: {radius}</div>
      <div>Height: {height}</div>
      <div>Center: {center.join(', ')}</div>
      <Handle type="target" position="left" id="radius" style={{ top: 70 }} />
      <Handle type="target" position="left" id="height" style={{ top: 90 }} />
      <Handle type="target" position="left" id="center" style={{ top: 110 }} />
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default CylinderNode;
