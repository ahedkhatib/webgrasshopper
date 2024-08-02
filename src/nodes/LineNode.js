import React, { useState, useEffect, useContext, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function LineNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [pointA, setPointA] = useState(data.pointA || [0, 0, 0]);
  const [pointB, setPointB] = useState(data.pointB || [0, 0, 0]);
  const prevEdgesRef = useRef([]);
  const prevNodesRef = useRef([]);

  useEffect(() => {
    const updatepoints = () => {
      let foundPoint1 = false;
      let foundPoint2 = false;
      
      edges.forEach((edge) => {
        if (edge.target === id && edge.targetHandle === 'pointA') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'point') {
            const newPointA = [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z];
            if (JSON.stringify(pointA) !== JSON.stringify(newPointA)) {
              setPointA(newPointA);
              updateNodeValue(id, 'pointA', newPointA);
            }
            foundPoint1 = true;
          } 
        }
        if (edge.target === id && edge.targetHandle === 'pointB') {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          if (sourceNode && sourceNode.type === 'point') {
            const newPointB = [sourceNode.data.x, sourceNode.data.y, sourceNode.data.z];
            if (JSON.stringify(pointB) !== JSON.stringify(newPointB)) {
              setPointB(newPointB);
              updateNodeValue(id, 'pointB', newPointB);
            }
            foundPoint2 = true;
          } 
        }

      });

      if (!foundPoint1) {
        setPointA([0, 0, 0]);
        updateNodeValue(id, 'pointA', [0, 0, 0]);
      }

      if (!foundPoint2) {
        setPointB([0, 0, 0]);
        updateNodeValue(id, 'pointB', [0, 0, 0]);
      }
    };

    const prevEdges = prevEdgesRef.current;
    const prevNodes = prevNodesRef.current;

    if (
      JSON.stringify(edges) !== JSON.stringify(prevEdges) ||
      JSON.stringify(nodes) !== JSON.stringify(prevNodes)
    ) {
      updatepoints();
    }

    prevEdgesRef.current = edges;
    prevNodesRef.current = nodes;
  }, [edges, nodes, id,pointA, setPointA, pointB, setPointB, updateNodeValue]);


  return (
    <div className={styles.customNode}>
      <div>Line Node</div>
      <div>Point A: [{pointA[0]}, {pointA[1]}, {pointA[2]}]</div>
      <div>Point B: [{pointB[0]}, {pointB[1]}, {pointB[2]}]</div>
      <Handle type="target" position="left" id="pointA" style={{ top: 20 }} />
      <Handle type="target" position="left" id="pointB" style={{ top: 60 }} />
      <Handle type="source" position="right" id="output" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default LineNode;



/*import React, { useEffect } from 'react';
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

export default LineNode;*/
