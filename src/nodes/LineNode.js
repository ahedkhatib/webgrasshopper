import React, { useEffect } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';

function LineNode({ data }) {
  useEffect(() => {
  }, [data]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="input1" style={{ top: 20 }} />
      <Handle type="target" position="left" id="input2" style={{ top: 60 }} />
      <div>
        <div>Point 1: ({data.x1 || 0}, {data.y1 || 0}, {data.z1 || 0}) </div>
        <div>Point 2: ({data.x2 || 0}, {data.y2 || 0}, {data.z2 || 0}) </div>
      </div>
      <Handle type="source" position="right" id="output" style={{ top: '50%' }} />
    </div>
  );
}

export default LineNode;
