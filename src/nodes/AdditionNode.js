import React, { useEffect, useContext, useState } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function AdditionNode({ id, data }) {
    const { edges, updateNodeValue, nodes } = useContext(NodesContext);
    const [prevData, setPrevData] = useState({ x: data.x, y: data.y});

    useEffect(() => {
        if (prevData.x !== data.x || prevData.y !== data.y) {
          setPrevData({ x: data.x, y: data.y });
        }
      }, [data.x, data.y, edges, id, nodes, updateNodeValue, prevData]);

      return (
        <div className={styles.customNode}>
          <div>Addition Node</div>
          <div>X: {data.x || 0}</div>
          <div>Y: {data.y || 0}</div>
          <div>Result: {data.x + data.y}</div>
          <Handle type="target" position="left" id="x" style={{ top: 20 }} />
          <Handle type="target" position="left" id="y" style={{ top: 60 }} />
          <Handle type="source" position="right" id="result" style={{ right: 0, top: '50%' }} />
        </div>
      );
}
export default AdditionNode;

