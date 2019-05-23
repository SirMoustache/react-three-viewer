import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Pig from './pig';

interface ViewerConfig {
  placeholder: HTMLElement;
}

const viewer = (config: ViewerConfig) => {
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let cameraControls: OrbitControls;
  let cameraLight: THREE.PointLight;

  /**
   * initialize THREE.js Scene
   * @private
   */
  const createScene = () => {
    scene = new THREE.Scene();
  };

  /**
   * initialize Three.js Perspective Camera
   * @private
   */
  const createCamera = () => {
    const width = config.placeholder.clientWidth;
    const height = config.placeholder.clientHeight;

    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000000);
    camera.position.set(5, 5, 5);
    camera.up = new THREE.Vector3(0, 0, 1);
    scene.add(camera);
  };

  /**
   * initialize THREE.js Renderer
   * @private
   */
  const createRenderer = () => {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.setSize(config.placeholder.clientWidth, config.placeholder.clientHeight);

    config.placeholder.appendChild(renderer.domElement);
  };

  /**
   * initialize Three.js Cameras Controls
   * @private
   */
  const createCameraControls = () => {
    const autoRotateDefaultSpeed = 5.0;

    cameraControls =
      cameraControls || new OrbitControls(camera, renderer.domElement);
    cameraControls.autoRotateSpeed = autoRotateDefaultSpeed;
    cameraControls.enableKeys = false;

    updateCameraControls();
  };

  /**
   * initialize Light from Camera
   * @private
   */
  const createCameraLight = () => {
    cameraLight = cameraLight || new THREE.PointLight(0xffffff, 0.7, 0);
    camera.add(cameraLight);
  };

  /**
   * Create Pig
   */

  const createPig = () => {
    const pig = new Pig();
    scene.add(pig.bodyGroup);
  };

  const updateCameraControls = () => {
    cameraControls.update();
  };

  /**
   * render frame of current scene
   * @private
   */
  const render = () => {
    renderer.render(scene, camera);
  };

  /**
   * start animation loop
   * @private
   */
  const animationLoop = () => {
    render();
    updateCameraControls();
    requestAnimationFrame(animationLoop);
  };

  createScene();
  createCamera();
  createRenderer();
  createCameraControls();
  createCameraLight();
  createPig();
  animationLoop();

  return { render };
};

export default viewer;
