import React, { createContext } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';

const NodesContext = createContext();

const NodesProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const updateNodeValue = (nodeId, handle, value) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, [handle]: value } };
        }
        return node;
      })
    );
  };

  return (
    <NodesContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, updateNodeValue }}>
      {children}
    </NodesContext.Provider>
  );
};

export { NodesContext, NodesProvider };
