import React, { useState, useEffect, useContext, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function CylinderNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [radius, setRadius] = useState(data.radius || 1);
  const [height, setHeight] = useState(data.height || 1);
  const [center, setCenter] = useState(data.center || [0, 0, 0]);
  const prevEdgesRef = useRef([]);
  const prevNodesRef = useRef([]);

  useEffect(() => {
    const updateValues = () => {
      let foundRadius = false;
      let foundHeight = false; 
      let foundCenter = false; 

      edges.forEach((edge) => {
        if (edge.target === id && edge.targetHandle === 'radius') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'decimal') {
            if(radius !== sourceNode.data.value) {
              setRadius(sourceNode.data.value);
              updateNodeValue(id, 'radius', sourceNode.data.value);
            }
            foundRadius = true;
          }
        } 
        if (edge.target === id && edge.targetHandle === 'height') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'decimal') {
            if(height !== sourceNode.data.value) {
              setHeight(sourceNode.data.value);
              updateNodeValue(id, 'height', sourceNode.data.value);
            }
            foundHeight = true;
          }
        } 
        if (edge.target === id && edge.targetHandle === 'center') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'point') {
            const newCenter = [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z];
            if (JSON.stringify(center) !== JSON.stringify(newCenter)) {
              setCenter(newCenter);
              updateNodeValue(id, 'center', newCenter);
            }
            foundCenter = true;
          }
        }

      });

      if (!foundRadius) {
        setRadius(1);
        updateNodeValue(id, 'radius', 1);
      }

      if (!foundHeight) {
        setHeight(1);
        updateNodeValue(id, 'height', 1);
      }

      if (!foundCenter) {
        setCenter([0, 0, 0]);
        updateNodeValue(id, 'center', [0, 0, 0]);
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
  }, [edges, nodes, id, radius, data.radius , height, setHeight, center, setCenter, updateNodeValue]);


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
