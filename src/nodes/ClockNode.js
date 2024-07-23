import React, { useEffect, useState } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';

function ClockNode({ id, data }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="input" />
      <div className={styles.clock}>
        <div className={styles.clockFace}>
          <div  className={`${styles.clockHand} ${styles.hourHand}`} style={{transform: `rotate(${(time.getHours() % 12) * 30}deg)` }} />
          <div className={`${styles.clockHand} ${styles.minuteHand}`} style={{transform: `rotate(${time.getMinutes() * 6}deg)` }} />
          <div className={`${styles.clockHand} ${styles.secondHand}`} style={{transform: `rotate(${time.getSeconds() * 6}deg)` }} />
        </div>
        <div>{formatTime(time)}</div>
      </div>
      <Handle type="source" position="right" id="output" />
    </div>
  );
}

export default ClockNode;
