import React, { useState, useEffect, useContext, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function CircleNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [radius, setRadius] = useState(data.radius || 1);
  const [plane, setPlane] = useState(data.plane || [0, 0, 0]);
  const prevEdgesRef = useRef([]);
  const prevNodesRef = useRef([]);

  useEffect(() => {
    const updateRadiusAndPlane = () => {
      let foundRadius = false;
      let foundPlane = false;

      edges.forEach((edge) => {
        if (edge.target === id && edge.targetHandle === 'radius') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'custom') {
            if(radius !== sourceNode.data.value) {
              setRadius(sourceNode.data.value);
              updateNodeValue(id, 'radius', sourceNode.data.value);
            }
            foundRadius = true;
          }
        } 
        if (edge.target === id && edge.targetHandle === 'plane') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'point') {
            const newPlane = [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z];
            if (JSON.stringify(plane) !== JSON.stringify(newPlane)) {
              setPlane(newPlane);
              updateNodeValue(id, 'plane', newPlane);
            }
            foundPlane = true;
          }
        }
      });

      if (!foundRadius) {
        setRadius(1);
        updateNodeValue(id, 'radius', 1);
      }

      if (!foundPlane) {
        setPlane([0, 0, 0]); 
        updateNodeValue(id, 'plane', [0, 0, 0]);
      }
    };

    const prevEdges = prevEdgesRef.current;
    const prevNodes = prevNodesRef.current;

    if (
      JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
      JSON.stringify(nodes) !== JSON.stringify(prevNodes)
    ) {
      updateRadiusAndPlane();
    }

    prevEdgesRef.current = edges;
    prevNodesRef.current = nodes;
  }, [edges, nodes, id, radius, data.radius, plane, setPlane, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <div>Circle Node</div>
      <div>Radius: {data.radius}</div>
      <div>Plane: [{plane[0]}, {plane[1]}, {plane[2]}]</div>
      <Handle type="target" position="left" id="radius" style={{ top: 70 }}/>
      <Handle type="target" position="left" id="plane" style={{ top: 90 }} />
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default CircleNode;
