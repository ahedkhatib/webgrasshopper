import React, { useEffect, useContext, useState, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function UnitVectorNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [direction, setDirection] = useState(data.direction || 'x');
  const [value, setValue] = useState(data.value !== undefined ? data.value : 1);
  const prevEdgesRef = useRef(edges);
  const prevNodesRef = useRef(nodes);

  useEffect(() => {
    const updateValues = () => {
      let foundValue = false;

      edges.forEach((edge) => {
        if (edge.target === id && edge.targetHandle === 'input') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'custom') {
            const newValue = sourceNode.data.value;
            if (newValue !== undefined) {
              setValue(newValue);
              updateNodeValue(id, 'value', newValue);
              foundValue = true;
            }
          }
        }
      });

      if (!foundValue) {
        setValue(1);
        updateNodeValue(id, 'value', 1);
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
  }, [edges, nodes, id, updateNodeValue]);

  useEffect(() => {
    let result;
    if (direction === 'x') {
      result = [value, 0, 0];
    } else if (direction === 'y') {
      result = [0, value, 0];
    } else if (direction === 'z') {
      result = [0, 0, value];
    }
    updateNodeValue(id, 'result', result);
  }, [direction, value, id, updateNodeValue]);

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
    updateNodeValue(id, 'direction', newDirection);
  };

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="input" />
      <div className={styles.unitVectorNode}>
        <div>
          <button
            style={{
              cursor: 'pointer',
              border: 0,
              borderRadius: '4px',
              background: direction === 'x' ? 'blue' : 'white',
              color: direction === 'x' ? 'white' : 'black',
            }}
            onClick={() => handleDirectionChange('x')}
          >
            X
          </button>
          <button
            style={{
              cursor: 'pointer',
              border: 0,
              borderRadius: '4px',
              background: direction === 'y' ? 'blue' : 'white',
              color: direction === 'y' ? 'white' : 'black',
            }}
            onClick={() => handleDirectionChange('y')}
          >
            Y
          </button>
          <button
            style={{
              cursor: 'pointer',
              border: 0,
              borderRadius: '4px',
              background: direction === 'z' ? 'blue' : 'white',
              color: direction === 'z' ? 'white' : 'black',
            }}
            onClick={() => handleDirectionChange('z')}
          >
            Z
          </button>
        </div>
        <div>Value: {value}</div>
        <div>Result: {data.result ? data.result.join(', ') : ''}</div>
      </div>
      <Handle type="source" position="right" id="output" />
    </div>
  );
}

export default UnitVectorNode;
