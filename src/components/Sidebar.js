import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import '../App.css';

const Sidebar = ({ addNumberNode, addPointNode, addLineNode, addCircleNode, addBoxNode, addDecimalNode, addCylinderNode, addSphereNode, addAdditionNode, addMultiplicationNode, addClockNode, addCalenderNode, addBooleanNode, addPolylineNode, addUnitVetorNode, addXYPlaneNode, addXZPlaneNode, addYZPlaneNode, addDistanceNode, addColourNode }) => {
  return (
    <Menu>
      <ul className="bm-item-list">
        <li><button onClick={addNumberNode} className="bm-item">Number</button></li>
        <li><button onClick={addPointNode} className="bm-item">Point</button></li>
        <li><button onClick={addLineNode} className="bm-item">Line</button></li>
        <li><button onClick={addCircleNode} className="bm-item">Circle</button></li>
        <li><button onClick={addBoxNode} className="bm-item">Box</button></li>
        <li><button onClick={addDecimalNode} className="bm-item">Decimal</button></li>
        <li><button onClick={addCylinderNode} className="bm-item">Cylinder</button></li>
        <li><button onClick={addSphereNode} className="bm-item">Sphere</button></li>
        <li><button onClick={addAdditionNode} className="bm-item">Addition</button></li>
        <li><button onClick={addMultiplicationNode} className="bm-item">Multiplication</button></li>
        <li><button onClick={addClockNode} className="bm-item">Clock</button></li>
        <li><button onClick={addCalenderNode} className="bm-item">Calender</button></li>
        <li><button onClick={addBooleanNode} className="bm-item">Boolean</button></li>
        <li><button onClick={addPolylineNode} className="bm-item">Polyline</button></li>
        <li><button onClick={addUnitVetorNode} className="bm-item">Unit Vector</button></li>
        <li><button onClick={addXYPlaneNode} className="bm-item">XY Plane</button></li>
        <li><button onClick={addXZPlaneNode} className="bm-item">XZ Plane</button></li>
        <li><button onClick={addYZPlaneNode} className="bm-item">YZ Plane</button></li>
        <li><button onClick={addDistanceNode} className="bm-item">Distance</button></li>
        <li><button onClick={addColourNode} className="bm-item">Colour</button></li>
      </ul>
    </Menu>
  );
};

export default Sidebar;
