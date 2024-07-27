import React, { useState, useEffect, useContext, useRef } from 'react';
import { Handle } from 'reactflow';
import styles from './style.module.css';
import { NodesContext } from '../context/NodesContext';

function DecimalNode({ id, data }) {
    const { edges, updateNodeValue, nodes } = useContext(NodesContext);
    const [value, setValue] = useState(data.value || 0);
    const [prevData, setPrevData] = useState({value: data.value});

    const [inputOptions, setInputOptions] = useState({
        min: data.min || 0,
        max: data.max || 10,
        step: data.step || 0.1,
        type: data.type || 'range',
    });

    const [open, setOpen] = useState(false);
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialogNode = dialogRef.current;
    
        if (dialogNode) {
          dialogNode.addEventListener('cancel', () => {
            setOpen(false);
          });
    
          if (open) {
            dialogNode.showModal();
          } else {
            dialogNode.close();
          }
        }
      }, [open]);


    useEffect(() => {
      if (prevData.value !== data.value) {
        edges.forEach((edge) => {
          if (edge.source === id) {
            const targetNode = nodes.find((n) => n.id === edge.target);
            if (targetNode && targetNode.type === 'cylinder') {
              const targetHandle = edge.targetHandle;
              if (targetHandle === 'radius') {
                updateNodeValue(targetNode.id, 'radius', data.value);
              }
              if (targetHandle === 'height') {
                updateNodeValue(targetNode.id, 'height', data.value);
              }
            }

          }
        });

        setPrevData({value: data.value});
      }
    }, [data.value, edges, id, nodes, updateNodeValue, prevData]);


    const handleChange = (event) => {
        const newValue = parseFloat(event.target.value);
        setValue(newValue);
        if ( data.onChange) {
            data.onChange(newValue);
        }
    };

    function onCloseClick(e) {
        if (e.target.tagName === "DIALOG") {
          setOpen(false);
        }
      }

    return (
        <div className={styles.customNode}>
          
          <div onClick={onCloseClick} style={{ padding: 0 }}>
            <dialog onKeyDown={(e) => e.stopPropagation()} ref={dialogRef}>
              <label>Min</label>
              <input
                value={inputOptions.min}
                onChange={(e) =>
                  setInputOptions({ ...inputOptions, min: e.target.value })
                }
                type="decimal"
              ></input>
              <label>Max</label>
              <input
                value={inputOptions.max}
                onChange={(e) =>
                  setInputOptions({ ...inputOptions, max: e.target.value })
                }
                type="decimal"
              ></input>
              <label>
                Decimal
                <input
                  type="radio"
                  name="type"
                  value="decimal"
                  checked={inputOptions.type === "decimal"}
                  onChange={(e) =>
                    setInputOptions({ ...inputOptions, type: e.target.value })
                  }
                ></input>
              </label>
              <label>
                Range
                <input
                  type="radio"
                  name="type"
                  checked={inputOptions.type === "range"}
                  value="range"
                  onChange={(e) =>
                    setInputOptions({ ...inputOptions, type: e.target.value })
                  }
                ></input>
              </label>
            </dialog>
          </div>
          {inputOptions.type === "range" && (
            <small style={{ minWidth: "40px" }}>{value}</small>
          )}
          <input
            onDoubleClick={() => setOpen(true)}
            value={value}
            onChange={handleChange}
            style={{ width: "70px", height: "30px", textAlign: "center" }}
            type={inputOptions.type}
            min={inputOptions.min}
            max={inputOptions.max}
            step={inputOptions.step}
          />
          <Handle type="source" position="right" style={{right: 0, top: '50%', transform: 'translateY(-50%)'}} />
        </div>
      );
}

export default DecimalNode;