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
    edges.forEach((edge) => {
      if (edge.target === id) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'decimal') {
          if (edge.targetHandle === 'radius') {
            const newRadius = sourceNode.data.value;
            if (newRadius !== radius) {
              setRadius(newRadius);
              updateNodeValue(id, 'radius', newRadius);
            }
          } else if (edge.targetHandle === 'height') {
            const newHeight = sourceNode.data.value;
            if (newHeight !== height) {
              setHeight(newHeight);
              updateNodeValue(id, 'height', newHeight);
            }
          }
        } else if (sourceNode && sourceNode.type === 'point') {
          const newCenter = [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z];
          if (JSON.stringify(newCenter) !== JSON.stringify(center)) {
            setCenter(newCenter);
            updateNodeValue(id, 'center', newCenter);
          }
        }
      }
    });
  }, [edges, nodes, id, radius, height, center, updateNodeValue]);


  return (
    <div className={styles.customNode}>
      <div>Cylinder Node</div>
      <div>Radius: {radius}</div>
      <div>Height: {height}</div>
      <div>Center: {`(${center[0]}, ${center[1]}, ${center[2]})`}</div>
      <Handle type="target" position="left" id="radius" style={{ top: 70 }} />
      <Handle type="target" position="left" id="height" style={{ top: 90 }} />
      <Handle type="target" position="left" id="center" style={{ top: 110 }} />
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default CylinderNode;
