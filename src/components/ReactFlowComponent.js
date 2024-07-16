import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import FlowComponent from './FlowComponent';

function ReactFlowComponent() {
  return (
    <ReactFlowProvider>
      <FlowComponent />
    </ReactFlowProvider>
  );
}

export default ReactFlowComponent;


