import React, { useState, useEffect, useContext, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function DivideCurveNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [points, setPoints] = useState([]);
  const [division, setDivision] = useState(data.division || 10);
  const prevEdgesRef = useRef([]);
  const prevNodesRef = useRef([]);

  useEffect(() => {
    console.log('divide');
    const updateDivisionFromNumericNode = () => {
      let foundDivision = false;
      edges.forEach((edge) => {
        if (edge.target === id && edge.targetHandle === 'division') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'custom') {
            if (division !== sourceNode.data.value) {
              setDivision(sourceNode.data.value);
            }
            foundDivision = true;
          }
        }
      });
      if (!foundDivision && division !== data.division) {
        setDivision(data.division || 10); 
      }
    };

    const updatePoints = () => {
      let foundCurve = false;
      edges.forEach((edge) => {
        if (edge.target === id && edge.targetHandle === 'curve') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode) {
            foundCurve = true;
            if (sourceNode.type === 'line') {
              const { x1, y1, z1, x2, y2, z2 } = sourceNode.data;
              const newPoints = [];
              for (let i = 0; i <= division; i++) {
                const t = i / division;
                newPoints.push([
                  x1 * (1 - t) + x2 * t,
                  y1 * (1 - t) + y2 * t,
                  z1 * (1 - t) + z2 * t,
                ]);
              }
              setPoints(newPoints);
              updateNodeValue(id, 'points', newPoints);
            } else if (sourceNode.type === 'circle') {
              const { radius, plane } = sourceNode.data;
              const newPoints = [];
              for (let i = 0; i < division; i++) {
                const angle = (i * 2 * Math.PI) / division;
                newPoints.push([
                  plane[0] + radius * Math.sin(angle),
                  plane[1],
                  plane[2] + radius * Math.cos(angle),
                ]);
              }
              setPoints(newPoints);
              updateNodeValue(id, 'points', newPoints);
            }
          }
        }
      });
      if (!foundCurve) {
        setPoints([]);
        updateNodeValue(id, 'points', []);
      }
    };

    const prevEdges = prevEdgesRef.current;
    const prevNodes = prevNodesRef.current;

    if (
      JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
      JSON.stringify(nodes) !== JSON.stringify(prevNodes)
    ) {
      updateDivisionFromNumericNode();
      updatePoints();
    }

    prevEdgesRef.current = edges;
    prevNodesRef.current = nodes;
  }, [edges, nodes, id, division, data.division, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <div>Divide Curve Node</div>
      <div>
        <label>Division: {division} </label>
      </div>
      <Handle type="target" position="left" id="curve" style={{ top: 20 }} />
      <Handle type="target" position="left" id="division" style={{ top: 40 }} />
      <Handle type="source" position="right" id="points" style={{ top: '50%' }} />
    </div>
  );
}

export default DivideCurveNode;
