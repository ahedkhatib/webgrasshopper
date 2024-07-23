import React, { useContext, useEffect } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function PolylineNode({ id, data }) {
    const { edges, nodes, updateNodeValue } = useContext(NodesContext);
    const updateNodeInternals = useUpdateNodeInternals();
  
    useEffect(() => {
      const connectedPoints = edges
        .filter(edge => edge.target === id)
        .map(edge => nodes.find(node => node.id === edge.source && node.type === 'point'))
        .filter(node => node)
        .map(node => [node.data.x, node.data.y, node.data.z]);
  
      updateNodeValue(id, 'points', connectedPoints);
      updateNodeInternals(id);
    }, [edges, nodes, id, updateNodeValue, updateNodeInternals]);
  
    return (
      <div className={styles.customNode}>
        <Handle type="target" position="left" id="input"/>
        <div className={styles.polylineNode}>
           Polyline
        </div>
        <Handle type="source" position="right" id="output"/>
      </div>
    );
  }
  
  export default PolylineNode;