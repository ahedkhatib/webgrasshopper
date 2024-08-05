import React, { useEffect, useContext, useRef } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function PolylineCollapseNode({ id, data }) {
  const { edges, nodes, updateNodeValue } = useContext(NodesContext);
  const updateNodeInternals = useUpdateNodeInternals();
  const prevEdgesRef = useRef([]);
  const prevNodesRef = useRef([]);

  useEffect(() => {
    const updatePolyline = () => {
      const connectedPolylines = edges
        .filter(edge => edge.target === id)
        .map(edge => nodes.find(node => node.id === edge.source && node.type === 'polyline'))
        .filter(node => node)
        .map(node => node.data.points);

      const collapsedPolyline = [].concat(...connectedPolylines);
      updateNodeValue(id, 'collapsedPolyline', collapsedPolyline);
      updateNodeInternals(id);
    };

    const prevEdges = prevEdgesRef.current;
    const prevNodes = prevNodesRef.current;

    if (
      JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
      JSON.stringify(nodes) !== JSON.stringify(prevNodes)
    ) {
      updatePolyline();
    }

    prevEdgesRef.current = edges;
    prevNodesRef.current = nodes;
  }, [edges, nodes, id, updateNodeValue, updateNodeInternals]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="input" />
      <div className={styles.polylineCollapseNode}>
        Polyline Collapse
      </div>
      <Handle type="source" position="right" id="output" />
    </div>
  );
}

export default PolylineCollapseNode;
