import React, { useEffect, useContext, useRef, useState } from 'react';
import { Handle, useUpdateNodeInternals } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function MeshBoxNode({ id, data }) {
  const { edges, nodes, updateNodeValue } = useContext(NodesContext);
  const updateNodeInternals = useUpdateNodeInternals();
  const [box, setBox] = useState(null);
  const prevEdgesRef = useRef([]);
  const prevNodesRef = useRef([]);

  useEffect(() => {
    const updateBox = () => {
      const baseNode = edges
        .filter(edge => edge.target === id && edge.targetHandle === 'base')
        .map(edge => nodes.find(node => node.id === edge.source && node.type === 'box'))[0];

      const xCountNode = edges
        .filter(edge => edge.target === id && edge.targetHandle === 'xCount')
        .map(edge => nodes.find(node => node.id === edge.source && node.type === 'custom'))[0];

      const yCountNode = edges
        .filter(edge => edge.target === id && edge.targetHandle === 'yCount')
        .map(edge => nodes.find(node => node.id === edge.source && node.type === 'custom'))[0];

      const zCountNode = edges
        .filter(edge => edge.target === id && edge.targetHandle === 'zCount')
        .map(edge => nodes.find(node => node.id === edge.source && node.type === 'custom'))[0];

      if (baseNode && xCountNode && yCountNode && zCountNode) {
        const boxData = {
          pointA: baseNode.data.pointA,
          pointB: baseNode.data.pointB,
          xCount: xCountNode.data.value,
          yCount: yCountNode.data.value,
          zCount: zCountNode.data.value,
        };
        setBox(boxData);
        updateNodeValue(id, 'box', boxData);
        updateNodeInternals(id);
      }
    };

    const prevEdges = prevEdgesRef.current;
    const prevNodes = prevNodesRef.current;

    if (
      JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
      JSON.stringify(nodes) !== JSON.stringify(prevNodes)
    ) {
      updateBox();
    }

    prevEdgesRef.current = edges;
    prevNodesRef.current = nodes;
  }, [edges, nodes, id, updateNodeValue, updateNodeInternals]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="base" style={{ top: '35%' }} />
      <Handle type="target" position="left" id="xCount" style={{ top: '53%' }} />
      <Handle type="target" position="left" id="yCount" style={{ top: '70%' }} />
      <Handle type="target" position="left" id="zCount" style={{ top: '90%' }} />
      <div>Mesh Box:</div>
      <div>Box</div>
      <div>X</div>
      <div>Y</div>
      <div>Z</div>
      <Handle type="source" position="right" id="mesh" style={{ top: '50%' }} />
    </div>
  );
}

export default MeshBoxNode;
