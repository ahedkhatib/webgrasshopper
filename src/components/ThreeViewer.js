import React, { useEffect, useRef, useContext } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { NodesContext } from '../context/NodesContext';

const OpenCascadeViewer = () => {
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
    camera.position.set(10, 10, 10);
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
    });

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    renderer.render(scene, camera);
  }, [nodes]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default OpenCascadeViewer;