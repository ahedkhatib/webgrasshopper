import React, { useContext, useState, useEffect, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function FitLineNode({ id, data }) {
  const { edges, nodes, updateNodeValue } = useContext(NodesContext);
  const [points, setPoints] = useState(data.points || []);
  const [line, setLine] = useState(data.line || null);
  const prevPointsRef = useRef(points);

  useEffect(() => {
    console.log('a');
    const fitLine = () => {
      if (points.length > 1) {
        const xSum = points.reduce((acc, point) => acc + point[0], 0);
        const ySum = points.reduce((acc, point) => acc + point[1], 0);
        const zSum = points.reduce((acc, point) => acc + point[2], 0);

        const centerX = xSum / points.length;
        const centerY = ySum / points.length;
        const centerZ = zSum / points.length;

        const newLine = { centerX, centerY, centerZ };

        if (newLine.centerX !== line?.centerX || newLine.centerY !== line?.centerY || newLine.centerZ !== line?.centerZ) {
          setLine(newLine);
          updateNodeValue(id, 'line', newLine);
        }
      }
    };

    fitLine();
  }, [points, id, updateNodeValue, line]);

  useEffect(() => {
    console.log('b');
    const newPoints = edges
      .filter(edge => edge.target === id && edge.targetHandle === 'points')
      .map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'point') {
          return [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z];
        }
        return null;
      })
      .filter(point => point !== null);

    if (newPoints.length !== prevPointsRef.current.length ||
        newPoints.some((point, index) => point[0] !== prevPointsRef.current[index][0] ||
                                         point[1] !== prevPointsRef.current[index][1] ||
                                         point[2] !== prevPointsRef.current[index][2])) {
      setPoints(newPoints);
      updateNodeValue(id, 'points', newPoints);
      prevPointsRef.current = newPoints;
    }
  }, [edges, nodes, id, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="points" style={{ top: 20 }} />
      <div className={styles.fitLineNode}>
        Fit Line
      </div>
      <Handle type="source" position="right" id="line" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default FitLineNode;
