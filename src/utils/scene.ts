/**
 * Absolute imports
 */
import THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import 'three/examples/js/controls/OrbitControls';

import { getBoundingBoxCenter } from './boundingBox';

/**
 * initialize THREE.js Scene
 */
// export const createScene = () => {
//   const scene = new THREE.Scene();
//   return scene;
// };

/**
 * initialize Three.js Perspective Camera
 */
export const createCamera = (aspect: number) => {
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000000);
  camera.position.set(5, 5, 5);
  camera.up = new THREE.Vector3(0, 0, 1);

  return camera;
};

/**
 * initialize THREE.js Renderer
 */
export const createRenderer = (width: number, height: number, canvas?: any) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas,
  });

  renderer.gammaInput = true;
  renderer.gammaOutput = true;

  renderer.setSize(width, height);

  return renderer;
};

export class Test {
  camera: any;

  elem: any;

  autoRotateSpeed: any;

  enableKeys: any;

  constructor(camera: any, elem: any) {
    this.camera = camera;
    this.elem = elem;
  }

  update() {}
}

/**
 * initialize Three.js Cameras Controls
 */
export const createCameraControls = (
  camera: THREE.Camera,
  renderer: THREE.Renderer,
) => {
  const autoRotateDefaultSpeed = 5.0;

  const cameraControls = new OrbitControls(camera, renderer.domElement);

  cameraControls.autoRotateSpeed = autoRotateDefaultSpeed;
  cameraControls.enableKeys = false;
  cameraControls.update();

  return cameraControls;
};

/**
 * initialize Light from Camera
 */
const createCameraLight = () => {
  const cameraLight = new THREE.PointLight(0xffffff, 0.7, 0);
  return cameraLight;
};

/**
 * Update Camera size
 */
const updateCameraSize = (
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number,
) => {
  // eslint-disable-next-line no-param-reassign
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

/**
 * Update Renderer size
 * @private
 */
const updateRendererSize = (
  renderer: THREE.Renderer,
  width: number,
  height: number,
) => {
  renderer.setSize(width, height);
};

/**
 * Set Camera Target
 */
export const setCameraTarget = (
  cameraControls: OrbitControls,
  target: THREE.Vector3,
) => {
  // eslint-disable-next-line no-param-reassign
  cameraControls.target = target;
  cameraControls.update();
};

export interface SceneOptions {
  placeholder: HTMLElement;
}

export const createScene = ({ placeholder }: SceneOptions) => {
  const width = placeholder.clientWidth;
  const height = placeholder.clientHeight;

  const scene = new THREE.Scene();

  const camera = createCamera(width / height);
  const renderer = createRenderer(width, height);
  const cameraControls = createCameraControls(camera, renderer);
  const cameraLight = createCameraLight();

  scene.add(camera);
  camera.add(cameraLight);
  cameraControls.update();

  placeholder.appendChild(renderer.domElement);

  /**
   * render frame of current scene
   */
  const render = () => {
    renderer.render(scene, camera);
  };

  /**
   * Force Camera and Renderer size update
   */
  const resize = () => {
    const { clientWidth, clientHeight } = placeholder;
    updateCameraSize(camera, clientWidth, clientHeight);
    updateRendererSize(renderer, clientWidth, clientHeight);
  };

  /**
   * Add Objects to scene
   */
  const add = (object: THREE.Object3D) => {
    const center = getBoundingBoxCenter(object);
    setCameraTarget(cameraControls, center);
    scene.add(object);
  };

  /**
   * Start render animation loop
   */
  const animationLoop = () => {
    render();
    cameraControls.update();
    requestAnimationFrame(animationLoop);
  };

  animationLoop();

  return { scene, render, add, resize };
};
