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
import AdditionNode from '../nodes/AdditionNode';
import MultiplicationNode from '../nodes/MultiplicationNode';
import ClockNode from '../nodes/ClockNode';
import CalenderNode from '../nodes/CalenderNode';
import BooleanNode from '../nodes/BooleanNode';
import PolylineNode from '../nodes/PolylineNode';
import UnitVectorNode from '../nodes/UnitVectorNode';
import XYPlaneNode from '../nodes/XYPlaneNode';
import XZPlaneNode from '../nodes/XZPlaneNode';
import YZPlaneNode from '../nodes/YZPlaneNode';
import DistanceNode from '../nodes/DistanceNode';
import ColourNode from '../nodes/ColourNode';
import TextNode from '../nodes/TextNode';
import FitLineNode from '../nodes/FitLineNode';
import DivideCurveNode from '../nodes/DivideCurveNode';
import { NodesContext } from '../context/NodesContext';
import '../button.css';
import Sidebar from './Sidebar';


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
    addition: AdditionNode,
    multiplication: MultiplicationNode,
    clock: ClockNode,
    calender: CalenderNode,
    boolean: BooleanNode,
    polyline: PolylineNode,
    unitVector: UnitVectorNode,
    xyPlane: XYPlaneNode,
    xzPlane: XZPlaneNode,
    yzPlane: YZPlaneNode,
    distance: DistanceNode,
    colour: ColourNode,
    text: TextNode,
    fitLine: FitLineNode,
    divideCurve: DivideCurveNode,
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

  const addAdditionNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'addition',
      data: {
        x: 0,
        y: 0,
        result: 0,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addMultiplicationNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'multiplication',
      data: {
        x: 1,
        y: 1,
        result: 1,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addClockNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'clock',
      data: {},
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addCalenderNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'calender',
      data: {},
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addBooleanNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'boolean',
      data: {
        boolean: false,
      onChange: (value) => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === id) {
              return { ...node, data: { ...node.data, boolean: value } };
            }
            return node;
          })
        );
      },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addPolylineNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'polyline',
      data: {
        points: [],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addUnitVetorNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'unitVector',
      data: {
        direction: 'x',
        value: 1,
        result: [1, 0, 0],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addXYPlaneNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'xyPlane',
      data: {
        origin: [0, 0, 0],
        plane: { origin: [0, 0, 0], normal: [0, 0, 1] },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addXZPlaneNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'xzPlane',
      data: {
        origin: [0, 0, 0],
        plane: { origin: [0, 0, 0], normal: [0, 1, 0] },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addYZPlaneNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'yzPlane',
      data: {
        origin: [0, 0, 0],
        plane: { origin: [0, 0, 0], normal: [1, 0, 0] },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addDistanceNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'distance',
      data: {
        pointA: [0, 0, 0],
        pointB: [0, 0, 0],
        distance: 0,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addColourNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'colour',
      data: {
        alpha: 1.0,
        x: 0.0,
        y: 0.0,
        z: 0.0,
        colour: 'rgba(0, 0, 0, 1)',
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addTextNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'text',
      data: {
        text: '',
        onChange: (newText) => {
          setNodes((nds) => 
            nds.map((node) => {
              if (node.id === id) {
                return { ...node, data: { ...node.data, text: newText } };
              }
              return node;
            })
          );
        },
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addFitLineNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'fitLine',
      data: {
        points: [],
        line: null,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const addDivideCurveNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'divideCurve',
      data: {
        division: 10,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const computeColour = (alpha, x, y, z) => {
    const r = x * 255;
    const g = y * 255;
    const b = z * 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  
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
            if(node.type === 'xyPlane') {
              if (targetHandle === 'origin') {
                node.data.origin = [sourceData.x, sourceData.y, sourceData.z];
                const plane = {
                  origin: node.data.origin,
                  normal: [0, 0, 1],
                };
                updateNodeValue(node.id, 'plane', plane);
              }
            }
            if(node.type === 'xzPlane') {
              if (targetHandle === 'origin') {
                node.data.origin = [sourceData.x, sourceData.y, sourceData.z];
                const plane = {
                  origin: node.data.origin,
                  normal: [0, 1, 0],
                };
                updateNodeValue(node.id, 'plane', plane);
              }
            }
            if(node.type === 'yzPlane') {
              if (targetHandle === 'origin') {
                node.data.origin = [sourceData.x, sourceData.y, sourceData.z];
                const plane = {
                  origin: node.data.origin,
                  normal: [1, 0, 0],
                };
                updateNodeValue(node.id, 'plane', plane);
              }
            }
            if (node.type === 'distance') {
              if (targetHandle === 'pointA') {
                node.data.pointA = [sourceData.x, sourceData.y, sourceData.z];
              } else if (targetHandle === 'pointB') {
                node.data.pointB = [sourceData.x, sourceData.y, sourceData.z];
              }
              const dist = Math.sqrt(
                Math.pow(node.data.pointA[0] - node.data.pointB[0], 2) +
                Math.pow(node.data.pointA[1] - node.data.pointB[1], 2) +
                Math.pow(node.data.pointA[2] - node.data.pointB[2], 2)
              );
              updateNodeValue(node.id, 'distance', dist);
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
            if (node.type === 'colour') {
              if (targetHandle === 'alpha') {
                node.data.alpha = sourceData.value;
              } else if (targetHandle === 'x') {
                node.data.x = sourceData.value;
              } else if (targetHandle === 'y') {
                node.data.y = sourceData.value;
              } else if (targetHandle === 'z') {
                node.data.z = sourceData.value;
              }
              const col = computeColour(node.data.alpha, node.data.x, node.data.y, node.data.z);
              updateNodeValue(node.id, 'colour', col);
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
            if (node.type === 'addition' ) {
              updateNodeValue(node.id, targetHandle, sourceData.value !== undefined ? sourceData.value : 0);
            }
            if (node.type === 'multiplication' ) {
              updateNodeValue(node.id, targetHandle, sourceData.value !== undefined ? sourceData.value : 1);
            }
            if (node.type === 'unitVector') {
              updateNodeValue(node.id, 'value', sourceData.value);
            }
          }
          if (node.type === 'polyline') {
            const connectedPoints = edges
              .filter(edge => edge.target === node.id)
              .map(edge => nds.find(n => n.id === edge.source && n.type === 'point'))
              .filter(n => n)
              .map(n => [n.data.x, n.data.y, n.data.z]);
  
            node.data = { ...node.data, points: connectedPoints };
          }
          
        }
        return node;
      })
    );
  }, [setEdges, setNodes, updateNodeValue, edges]);

  const onEdgesDelete = useCallback((deletedEdges) => {
    setEdges((eds) => 
      { const updatedEdges = eds.filter((edge) => !deletedEdges.includes(edge));
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
            } else if (node.type === 'addition') {
              if (targetHandle === 'x') {
                //console.log("delete");
                node.data = { ...node.data, x: 0 };
                //console.log("updatex :", node.data.x);
              } else if (targetHandle === 'y') {
                node.data = { ...node.data, y: 0 };
              }
            } else if (node.type === 'multiplication') {
              node.data = { ...node.data, [targetHandle]: 1 };
            } else if (node.type === 'polyline') {
              const connectedPoints = updatedEdges
              .filter(edge => edge.target === node.id)
              .map(edge => nodes.find(n => n.id === edge.source && n.type === 'point'))
              .filter(n => n)
              .map(n => [n.data.x, n.data.y, n.data.z]);

            node.data = { ...node.data, points: connectedPoints };
            } else if (node.type === 'unitVector') {
              const connectedEdges = updatedEdges.filter(edge => edge.target === node.id);
              if (connectedEdges.length === 0) {
                node.data = { ...node.data, value: 1 };
              }
             } else if (node.type === 'xyPlane') {
              const connectedEdges = updatedEdges.filter(edge => edge.target === node.id);
              if (connectedEdges.length === 0) {
                node.data = { ...node.data, origin: [0, 0, 0] };
                const plane = {
                  origin: [0, 0, 0],
                  normal: [0, 0, 1],
                };
                node.data = { ...node.data, plane };
              }
            } else if (node.type === 'xzPlane') {
              const connectedEdges = updatedEdges.filter(edge => edge.target === node.id);
              if (connectedEdges.length === 0) {
                node.data = { ...node.data, origin: [0, 0, 0] };
                const plane = {
                  origin: [0, 0, 0],
                  normal: [0, 1, 0],
                };
                node.data = { ...node.data, plane };
              }
            } else if (node.type === 'yzPlane') {
              const connectedEdges = updatedEdges.filter(edge => edge.target === node.id);
              if (connectedEdges.length === 0) {
                node.data = { ...node.data, origin: [0, 0, 0] };
                const plane = {
                  origin: [0, 0, 0],
                  normal: [1, 0, 0],
                };
                node.data = { ...node.data, plane };
              }
            } else if (node.type === 'distance') {
              if (targetHandle === 'pointA') {
                node.data = { ...node.data, pointA: [0, 0, 0] };
              } else if (targetHandle === 'pointB') {
                node.data = { ...node.data, pointB: [0, 0, 0] };
              }
              const dist = Math.sqrt(
                Math.pow(node.data.pointA[0] - node.data.pointB[0], 2) +
                Math.pow(node.data.pointA[1] - node.data.pointB[1], 2) +
                Math.pow(node.data.pointA[2] - node.data.pointB[2], 2)
              );
              updateNodeValue(node.id, 'distance', dist);
            } else if (node.type === 'colour') {
              if (targetHandle === 'alpha') {
                node.data = { ...node.data, alpha: 1.0 };
              } else if (targetHandle === 'x') {
                node.data = { ...node.data, x: 0.0 };
              } else if (targetHandle === 'y') {
                node.data = { ...node.data, y: 0.0 };
              } else if (targetHandle === 'z') {
                node.data = { ...node.data, z: 0.0 };
              }
              const col = computeColour(node.data.alpha, node.data.x, node.data.y, node.data.z);
              updateNodeValue(node.id, 'colour', col);
            } else if (node.type === 'fitLine') {
              const connectedPoints = updatedEdges
                .filter(e => e.target === node.id && e.targetHandle === 'points')
                .map(e => nds.find(n => n.id === e.source && n.type === 'point'))
                .filter(n => n)
                .map(n => [n.data.x, n.data.y, n.data.z]);
          
              node.data = { ...node.data, points: connectedPoints };
          
              if (connectedPoints.length > 1) {
                const xSum = connectedPoints.reduce((acc, point) => acc + point[0], 0);
                const ySum = connectedPoints.reduce((acc, point) => acc + point[1], 0);
                const zSum = connectedPoints.reduce((acc, point) => acc + point[2], 0);
          
                const centerX = xSum / connectedPoints.length;
                const centerY = ySum / connectedPoints.length;
                const centerZ = zSum / connectedPoints.length;
          
                node.data.line = { centerX, centerY, centerZ };
              } else {
                node.data.line = null;
              }
            }
          }
        });
        return node;
      })
    );

    return updatedEdges;
  });
  }, [setEdges, setNodes, nodes, updateNodeValue]);

  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Sidebar
        addNumberNode={addNumberNode}
        addPointNode={addPointNode}
        addLineNode={addLineNode}
        addBoxNode={addBoxNode}
        addCircleNode={addCircleNode}
        addDecimalNode={addDecimalNode}
        addCylinderNode={addCylinderNode}
        addSphereNode={addSphereNode}
        addAdditionNode={addAdditionNode}
        addMultiplicationNode={addMultiplicationNode}
        addClockNode={addClockNode}
        addCalenderNode={addCalenderNode}
        addBooleanNode={addBooleanNode}
        addPolylineNode={addPolylineNode}
        addUnitVetorNode={addUnitVetorNode}
        addXYPlaneNode={addXYPlaneNode}
        addXZPlaneNode={addXZPlaneNode}
        addYZPlaneNode={addYZPlaneNode}
        addDistanceNode={addDistanceNode}
        addColourNode={addColourNode}
        addTextNode={addTextNode}
        addFitLineNode={addFitLineNode}
        addDivideCurveNode={addDivideCurveNode}
      />
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
    </div>
  );
}

export default FlowComponent;
