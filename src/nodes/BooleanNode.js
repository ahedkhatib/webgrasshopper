import React from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';

function BooleanNode({ id, data }) {
  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="input" />
      <div className={styles.booleanNode}>
        <label>
          <input
            type="checkbox"
            checked={data.boolean}
            onChange={(e) => data.onChange(e.target.checked)}
          />
          True
        </label>
      </div>
      <Handle type="source" position="right" id="output" />
    </div>
  );
}

export default BooleanNode;
