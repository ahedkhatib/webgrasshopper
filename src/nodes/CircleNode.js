import React, { useState, useEffect, useContext } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function CircleNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [radius, setRadius] = useState(data.radius || 1);
  const [plane, setPlane] = useState(data.plane || [0, 0, 0]);

  useEffect(() => {
    edges.forEach((edge) => {
      if (edge.target === id) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'custom') {
          setRadius(sourceNode.data.value);
          if (data.onChange) {
            data.onChange('radius', sourceNode.data.value);
          }
        } else if (sourceNode && sourceNode.type === 'point') {
          setPlane([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
        }
      }
    });
  }, [edges, nodes, id]);

  useEffect(() => {
    updateNodeValue(id, 'radius', radius);
    updateNodeValue(id, 'plane', plane);
  }, [radius, plane, id, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <div>Circle Node</div>
      <div>Radius: {radius}</div>
      <div>Plane: {`(${plane[0]}, ${plane[1]}, ${plane[2]})`}</div>
      <Handle type="target" position="left" id="radius" style={{ top: 70 }}/>
      <Handle type="target" position="left" id="plane" style={{ top: 90 }} />
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default CircleNode;
