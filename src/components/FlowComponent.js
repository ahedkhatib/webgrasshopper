import React, { useCallback, useContext } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import NumberNode from '../nodes/NumberNode';
import PointNode from '../nodes/PointNode';
import LineNode from '../nodes/LineNode';
import CircleNode from '../nodes/CircleNode';
import BoxNode from '../nodes/BoxNode';
import DecimalNode from '../nodes/DecimalNode';
import CylinderNode from '../nodes/CylinderNode';
import SphereNode from '../nodes/SphereNode';
import { NodesContext } from '../context/NodesContext';
import '../button.css';


const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const nodeTypes = {
    custom: NumberNode,
    point: PointNode,
    line: LineNode,
    circle: CircleNode,
    box: BoxNode,
    decimal: DecimalNode,
    cylinder: CylinderNode,
    sphere: SphereNode,
};

const connectionLineStyle = { stroke: 'white' };

let nodeId = 0;

function FlowComponent() {
  const { nodes, setNodes,onNodesChange, edges, setEdges,onEdgesChange, updateNodeValue } = useContext(NodesContext);

  const addNumberNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'custom',
      data: {
        value: 0,
        onChange: (value) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === id) {
                return { ...node, data: { ...node.data, value } };
              }
              edges.forEach((edge) => {
                if (edge.source === id) {
                  updateNodeValue(edge.target, edge.targetHandle, value);
                }
              });
              return node;
            })
          );
        },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, edges, updateNodeValue]);

  const addPointNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'point',
      data: {
        x: 0,
        y: 0,
        z: 0,
        onChange: (axis, value) => {
          updateNodeValue(id, axis, value);
        },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, updateNodeValue]);

  const addLineNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'line',
      data: {
        x1: 0,
        y1: 0,
        z1: 0,
        x2: 0,
        y2: 0,
        z2: 0,
        onChange: (startOrEnd, axis, value) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === id) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    [startOrEnd]: {
                      ...node.data[startOrEnd],
                      [axis]: value,
                    },
                  },
                };
              }
              return node;
            })
          );
        },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addBoxNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'box',
      data: {
        pointA: [0, 0, 0],
        pointB: [0, 0, 0],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addCircleNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'circle',
      data: {
        radius: 1,
        plane: [0, 0, 0],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addDecimalNode = useCallback(() => { 
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'decimal',
      data: {
        value: 0,
        step: 0.1,
        onChange: (value) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === id) {
                return { ...node, data: { ...node.data, value } };
              }
              edges.forEach((edge) => {
                if (edge.source === id) {
                  updateNodeValue(edge.target, edge.targetHandle, value);
                }
              });
              return node;
            })
          );
        },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, edges, updateNodeValue]);

  const addCylinderNode = useCallback(() => { 
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'cylinder',
      data: {
        radius: 1,
        height: 1,
        center: [0, 0, 0],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addSphereNode = useCallback(() => { 
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'sphere',
      data: {
        radius: 1,
        center: [0, 0, 0],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === params.target) {
          const { targetHandle } = params;
          const sourceNode = nds.find((n) => n.id === params.source);
          if (sourceNode && sourceNode.type === 'point') {
            const sourceData = sourceNode.data;
            if (node.type === 'line') {
              node.data = {
                ...node.data,
                ...(targetHandle === 'input1'
                  ? { x1: sourceData.x, y1: sourceData.y, z1: sourceData.z }
                  : { x2: sourceData.x, y2: sourceData.y, z2: sourceData.z }),
              };
            }
            if (node.type === 'box') {
              node.data = {
                ...node.data,
                ...(targetHandle === 'pointA'
                  ? { pointA: [sourceData.x, sourceData.y, sourceData.z] }
                  : { pointB: [sourceData.x, sourceData.y, sourceData.z] }),
              };
            }
            if (node.type === 'circle') {
              if ( targetHandle === 'radius') {
                updateNodeValue(node.id, 'radius', sourceData.value);
              } else if (targetHandle === 'plane') {
                updateNodeValue(node.id, 'plane', [sourceData.x, sourceData.y, sourceData.z]);
              }
            }
            if (node.type === 'cylinder') {
              if (targetHandle === 'center') {
                node.data.center = [sourceData.x, sourceData.y, sourceData.z];
              }
            }
            if(node.type === 'sphere') {
              if ( targetHandle === 'center') {
                node.data.center = [sourceData.x, sourceData.y, sourceData.z];
              }
            }
          }
          if (sourceNode && sourceNode.type === 'decimal') {
            const sourceData = sourceNode.data;
            if (node.type === 'cylinder') {
              if (targetHandle === 'radius') {
                node.data.radius = sourceData.value;
              } else if (targetHandle === 'height') {
                node.data.height = sourceData.value;
              }
            }
          }
          if (sourceNode && sourceNode.type === 'custom') {
            const sourceData = sourceNode.data;
            if (node.type === 'sphere') { 
              if (targetHandle === 'radius') {
                node.data.radius = sourceData.value;
              }
            }
            if (node.type === 'point') { 
              if (targetHandle === 'x') {
                node.data.x = sourceData.value;
              }
              if (targetHandle === 'y') {
                node.data.y = sourceData.value;
              }
              if (targetHandle === 'z') {
                node.data.z = sourceData.value;
              }
            }
            if (node.type === 'circle') { 
              if (targetHandle === 'radius') {
                node.data.radius = sourceData.value;
              }
            }
          }
          
        }
        return node;
      })
    );
  }, [setEdges, setNodes, updateNodeValue]);

  const onEdgesDelete = useCallback((deletedEdges) => {
    setEdges((eds) => eds.filter((edge) => !deletedEdges.includes(edge)));
    setNodes((nds) =>
      nds.map((node) => {
        deletedEdges.forEach((edge) => {
          if (edge.target === node.id) {
            const { targetHandle } = edge;
            if (node.type === 'line') {
              if (targetHandle === 'input1') {
                node.data = { ...node.data, x1: 0, y1: 0, z1: 0 };
              } else if (targetHandle === 'input2') {
                node.data = { ...node.data, x2: 0, y2: 0, z2: 0 };
              }
            } else if (node.type === 'box') {
              if (targetHandle === 'pointA') {
                node.data = { ...node.data, pointA: [0, 0, 0] };
              } else if (targetHandle === 'pointB') {
                node.data = { ...node.data, pointB: [0, 0, 0] };
              }
            } else if (node.type === 'circle') {
              if (targetHandle === 'radius') {
                node.data = { ...node.data, radius: 1 };
              } else if (targetHandle === 'plane') {
                node.data = { ...node.data, plane: [0, 0, 0] };
              }
            } else if (node.type === 'cylinder') {
              if (targetHandle === 'radius') {
                node.data = { ...node.data, radius: 1 };
              } else if (targetHandle === 'height') {
                node.data = { ...node.data, height: 1 };
              } else if (targetHandle === 'center') {
                node.data = { ...node.data, center: [0, 0, 0] };
              }
            } else if (node.type === 'sphere') {
              if (targetHandle === 'radius') {
                node.data = { ...node.data, radius: 1 };
              } else if (targetHandle === 'center') {
                node.data = { ...node.data, center: [0, 0, 0] };
              }
            } else if (node.type === 'point') {
              if (targetHandle === 'x') {
                node.data = { ...node.data, x: 0 };
              } else if (targetHandle === 'y') {
                node.data = { ...node.data, y: 0 };
              } else if (targetHandle === 'z') {
                node.data = { ...node.data, z: 0 };
              }
            }
          }
        });
        return node;
      })
    );
  }, [setEdges, setNodes]);



  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={ nodeTypes }
        fitView
        connectionLineStyle={connectionLineStyle}
        edgeOptions={edgeOptions}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <div className="button-container">
        <button onClick={addNumberNode} className="btn-add">
          Number
        </button>
        <button onClick={addPointNode} className="btn-add">
          Point
        </button>
        <button onClick={addLineNode} className="btn-add">
          Line
        </button>
        <button onClick={addCircleNode} className="btn-add">
        Circle
        </button>
        <button onClick={ addBoxNode } className="btn-add">
          Box
        </button>
        <button onClick={addDecimalNode} className="btn-add">
          Decimal
        </button>
        <button onClick={addCylinderNode} className="btn-add">
          Cylinder
        </button>
        <button onClick={addSphereNode} className="btn-add">
          Sphere
        </button>
      </div>
    </div>
  );
}

export default FlowComponent;
