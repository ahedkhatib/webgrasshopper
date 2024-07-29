import React, { useEffect, useRef, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { NodesContext } from '../context/NodesContext';

const ThreeViewer = () => {
  const mountRef = useRef(null);
  const { nodes } = useContext(NodesContext);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef();
  const rendererRef = useRef();
  const orbitControlsRef = useRef();
  const transformControlsRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    const scene = sceneRef.current;

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.maxDistance = 50;
    orbitControlsRef.current = orbitControls;

    const transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.addEventListener('change', () => renderer.render(scene, camera));
    scene.add(transformControls);
    transformControlsRef.current = transformControls;

    scene.background = new THREE.Color(0xd3d3d3);

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    const onWindowResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(onWindowResize);
    resizeObserver.observe(mount);

    const animate = () => {
      requestAnimationFrame(animate);
      orbitControls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      resizeObserver.unobserve(mount);
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;

    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    nodes.forEach(node => {
      if (node.type === 'point') {
        const { x, y, z } = node.data;
        const pointGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
        pointMesh.position.set(x, y, z);
        scene.add(pointMesh);
      } else if (node.type === 'line') {
        const { x1, y1, z1, x2, y2, z2 } = node.data;
        const points = [
          new THREE.Vector3(x1, y1, z1),
          new THREE.Vector3(x2, y2, z2),
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      }
      else if (node.type === 'circle') {
        const { radius, plane } = node.data;
        const circleGeometry = new THREE.CircleGeometry(radius, 32);
        const circleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
        circleMesh.position.set(plane[0], plane[1], plane[2]);
        circleMesh.rotation.x = Math.PI / 2; 
        scene.add(circleMesh);
      }
      else if (node.type === 'box') {
        const { pointA, pointB } = node.data;
        const geometry = new THREE.BoxGeometry(
          Math.abs(pointB[0] - pointA[0]),
          Math.abs(pointB[1] - pointA[1]),
          Math.abs(pointB[2] - pointA[2])
        );
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const box = new THREE.Mesh(geometry, material);
        box.position.set(
          (pointA[0] + pointB[0]) / 2,
          (pointA[1] + pointB[1]) / 2,
          (pointA[2] + pointB[2]) / 2
        );
        scene.add(box);
      }
      else if ( node.type === 'cylinder') {
        const { radius, height, center} = node.data;
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(center[0], center[1], center[2] + height / 2); 
        scene.add(cylinder);
      }
      else if (node.type === 'sphere') {
        const { radius, center } = node.data;
        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(center[0], center[1], center[2]);
        scene.add(sphere);
      } else if (node.type === 'polyline') {
        const { points } = node.data;
        if(points.length > 1) {
          const polylinePoints = points.map (point => new THREE.Vector3(point[0], point[1], point[2]));
          const polylineGeometry = new THREE.BufferGeometry().setFromPoints(polylinePoints);
          const polylineMaterial = new THREE.LineBasicMaterial({ color: 0xff00ff });
          const polyline = new THREE.Line(polylineGeometry, polylineMaterial);
          scene.add(polyline);
        }
      } else if (node.type === 'unitVector') {
        const { result } = node.data;
        const directionVector = new THREE.Vector3(result[0], result[1], result[2]);
        const origin = new THREE.Vector3(0, 0, 0);
        const arrowHelper = new THREE.ArrowHelper(directionVector.clone().normalize(), origin, directionVector.length(), 0x0000ff);
        scene.add(arrowHelper);
      } else if (node.type === 'xyPlane') {
        const { origin } = node.data.plane;
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, opacity: 0.5, transparent: true });
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.position.set(origin[0], origin[1], origin[2]);
        planeMesh.rotation.x = Math.PI / 2; 
        scene.add(planeMesh);
      } else if (node.type === 'xzPlane') {
        const { origin } = node.data.plane;
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, opacity: 0.5, transparent: true });
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.position.set(origin[0], origin[1], origin[2]);
        planeMesh.rotation.z = Math.PI / 2; 
        scene.add(planeMesh);
      } else if (node.type === 'yzPlane') {
        const { origin } = node.data.plane;
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, opacity: 0.5, transparent: true });
        const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.position.set(origin[0], origin[1], origin[2]);
        planeMesh.rotation.y = Math.PI / 2; 
        scene.add(planeMesh);
      } else if (node.type === 'fitLine') {
        const lineData = node.data.line;
        if (lineData) {
          const { centerX, centerY, centerZ } = lineData;
          const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(centerX - 5, centerY, centerZ),
            new THREE.Vector3(centerX + 5, centerY, centerZ),
          ]);
          const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      } else if (node.type === 'divideCurve') {
        const { points } = node.data;
        if (points && points.length > 0) {
          points.forEach(point => {
            const pointGeometry = new THREE.SphereGeometry(0.1, 32, 32);
            const pointMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
            pointMesh.position.set(point[0], point[1], point[2]);
            scene.add(pointMesh);
          });
        }
      }
      
    });

    const axesHelper = new THREE.AxesHelper(20);
    scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);

    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    renderer.render(scene, camera);
  }, [nodes]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeViewer;