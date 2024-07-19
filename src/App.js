import React from 'react';
import ReactFlowComponent from './components/ReactFlowComponent';
import OpenCascadeViewer from './components/ThreeViewer';
import './App.css';
import { NodesProvider } from './context/NodesContext';

const App = () => {
  return (
  <NodesProvider>
    <div className="container">
      <div className="half">
        <ReactFlowComponent />
      </div>
      <div className="half">
        <OpenCascadeViewer/>
      </div>
    </div>
  </NodesProvider>
  );
};

export default App;


