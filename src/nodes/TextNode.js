import React, { useState, useEffect, useContext } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function TextNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [text, setText] = useState(data.text || '');

  useEffect(() => {
    edges.forEach((edge) => {
      if (edge.source === id) {
        const targetNode = nodes.find((n) => n.id === edge.target);
      }
    });
  }, [edges, nodes, id, text, updateNodeValue]);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    if (data.onChange) {
      data.onChange(newText);
    }
  };

  return (
    <div className={styles.customNode}>
      <div>Text</div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        style={{ width: '70px' }}
      />
      <Handle type="source" position="right" id="output" style={{ top: '50%' }} />
    </div>
  );
}

export default TextNode;
