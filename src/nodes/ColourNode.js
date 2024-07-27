import React, { useEffect, useContext, useState } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function ColourNode({ id, data }) {
  const { edges, updateNodeValue, nodes } = useContext(NodesContext);
  const [alpha, setAlpha] = useState(data.alpha || 1.0);
  const [x, setX] = useState(data.x || 0.0);
  const [y, setY] = useState(data.y || 0.0);
  const [z, setZ] = useState(data.z || 0.0);
  const [colour, setColour] = useState(data.colour || 'rgba(0, 0, 0, 1)');

  const computeColour = (alpha, x, y, z) => {
    const r = x * 255;
    const g = y * 255;
    const b = z * 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  useEffect(() => {
    const connectedEdges = edges.filter(edge => edge.target === id);
    const defaultAlpha = 1.0;
    const defaultX = 0.0;
    const defaultY = 0.0;
    const defaultZ = 0.0;

    let foundAlpha = false;
    let foundX = false;
    let foundY = false;
    let foundZ = false;

    connectedEdges.forEach((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      if (sourceNode && sourceNode.type === 'decimal') {
        if (edge.targetHandle === 'alpha') {
          setAlpha(sourceNode.data.value);
          updateNodeValue(id, 'alpha', sourceNode.data.value);
          foundAlpha = true;
        } else if (edge.targetHandle === 'x') {
          setX(sourceNode.data.value);
          updateNodeValue(id, 'x', sourceNode.data.value);
          foundX = true;
        } else if (edge.targetHandle === 'y') {
          setY(sourceNode.data.value);
          updateNodeValue(id, 'y', sourceNode.data.value);
          foundY = true;
        } else if (edge.targetHandle === 'z') {
          setZ(sourceNode.data.value);
          updateNodeValue(id, 'z', sourceNode.data.value);
          foundZ = true;
        }
      }
    });

    if (!foundAlpha) {
      setAlpha(defaultAlpha);
      updateNodeValue(id, 'alpha', defaultAlpha);
    }
    if (!foundX) {
      setX(defaultX);
      updateNodeValue(id, 'x', defaultX);
    }
    if (!foundY) {
      setY(defaultY);
      updateNodeValue(id, 'y', defaultY);
    }
    if (!foundZ) {
      setZ(defaultZ);
      updateNodeValue(id, 'z', defaultZ);
    }

    const col = computeColour(alpha, x, y, z);
    setColour(col);
    updateNodeValue(id, 'colour', col);

  }, [edges, nodes, id, alpha, x, y, z, updateNodeValue]);

  return (
    <div className={styles.customNode}>
      <Handle type="target" position="left" id="alpha" style={{ left: 0, top: '20%' }} />
      <Handle type="target" position="left" id="x" style={{ left: 0, top: '40%' }} />
      <Handle type="target" position="left" id="y" style={{ left: 0, top: '60%' }} />
      <Handle type="target" position="left" id="z" style={{ left: 0, top: '80%' }} />
      <div className={styles.colourNode} style={{ backgroundColor: colour }}>
        <table>
          <tbody>
            <tr>
              <td>Alpha:</td>
              <td>{alpha}</td>
            </tr>
            <tr>
              <td>X:</td>
              <td>{x}</td>
            </tr>
            <tr>
              <td>Y:</td>
              <td>{y}</td>
            </tr>
            <tr>
              <td>Z:</td>
              <td>{z}</td>
            </tr>
            <tr>
              <td>Colour:</td>
              <td colSpan='2'>{colour}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Handle type="source" position="right" id="colour" style={{ right: 0, top: '50%' }} />
    </div>
  );
}

export default ColourNode;
