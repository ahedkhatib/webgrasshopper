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
import PolygonEdgeNode from '../nodes/PolygonEdgeNode';
import PolylineCollapseNode from '../nodes/PolylineCollapseNode';
import MeshBoxNode from '../nodes/MeshBoxNode';
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
    polygonEdge : PolygonEdgeNode,
    polylineCollapse: PolylineCollapseNode,
    meshBox: MeshBoxNode,
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
        /*onChange: (axis, value) => {
          updateNodeValue(id, axis, value);
        },*/
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

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
        pointA: [0, 0, 0],
        pointB: [0, 0, 0],
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

  const addPolygonEdgeNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      type: 'polygonEdge',
      data: {
        polygon: [],
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);


const addPolylineCollapseNode = useCallback(() => {
  const id = `${++nodeId}`;
  const newNode = {
    id,
    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
    type: 'polylineCollapse',
    data: {
      collapsedPolyline: [],
    },
  };
  setNodes((nds) => nds.concat(newNode));
}, [setNodes]);

const addMeshBoxNode = useCallback(() => {
  const id = `${++nodeId}`;
  const newNode = {
    id,
    position: {
      x: Math.random() * 500,
      y: Math.random() * 500,
    },
    type: 'meshBox',
    data: {
      box: null,
    },
  };
  setNodes((nds) => nds.concat(newNode));
}, [setNodes]);
  

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  const onEdgesDelete = useCallback((deletedEdges) => {
    setEdges((eds) => 
      { const updatedEdges = eds.filter((edge) => !deletedEdges.includes(edge));
    return updatedEdges;
  });
  }, [setEdges]);

  
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
        addPolygonEdgeNode={addPolygonEdgeNode}
        addPolylineCollapseNode={addPolylineCollapseNode}
        addMeshBoxNode={addMeshBoxNode}
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
