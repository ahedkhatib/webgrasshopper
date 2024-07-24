import React, { useEffect, useContext, useState } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function UnitVectorNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [direction, setDirection] = useState(data.direction || 'x');
  const [value, setValue] = useState(data.value || 1);

  useEffect(() => {
    const connectedEdges = edges.filter(edge => edge.target === id);
    if (connectedEdges.length > 0) {
      connectedEdges.forEach((edge) => {
        const sourceNode = nodes.find((n) => n.id === edge.source);
        if (sourceNode && sourceNode.type === 'custom') {
          setValue(sourceNode.data.value);
          updateNodeValue(id, 'value', sourceNode.data.value);
        }
      });
    } else {
      setValue(1);
      updateNodeValue(id, 'value', 1);
    }
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
            onClick={() => {
              setDirection('x');
              updateNodeValue(id, 'direction', 'x');
            }}
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
            onClick={() => {
              setDirection('y');
              updateNodeValue(id, 'direction', 'y');
            }}
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
            onClick={() => {
              setDirection('z');
              updateNodeValue(id, 'direction', 'z');
            }}
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
