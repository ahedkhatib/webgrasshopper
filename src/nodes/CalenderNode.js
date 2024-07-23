import React from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';

function CalenderNode({ id, data }) {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="input" />
      <div className={styles.calender}>
        <div className={styles.calenderFace}>
          {getCurrentDate()}
        </div>
      </div>
      <Handle type="source" position="right" id="output" />
    </div>
  );
}

export default CalenderNode;
