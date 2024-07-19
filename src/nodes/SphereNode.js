import React, { useState, useEffect, useContext } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function SphereNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [radius, setRadius] = useState(data.radius || 1);
  const [center, setCenter] = useState(data.center || [0, 0, 0]);

  useEffect(() => {
    edges.forEach((edge) => {
      if (edge.target === id) {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'number') {
          setRadius(sourceNode.data.value);
        } else if (sourceNode && sourceNode.type === 'point') {
          setCenter([sourceNode.data.x, sourceNode.data.y, sourceNode.data.z]);
        }
      }
    });
  }, [edges, nodes, id]);

  useEffect(() => {
    console.log("sphere");
  }, [data]);

  return (
    <div className={styles.customNode}>
      <div>Sphere Node</div>
      <div>Radius</div>
      <div>Center</div>
      <Handle type="target" position="left" id="radius" style={{ top: 70 }} />
      <Handle type="target" position="left" id="center" style={{ top: 90 }} />
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default SphereNode;
