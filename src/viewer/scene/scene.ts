/**
 * Absolute imports
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Utils
 */
import {
  getBoundingBoxCenter,
  getCameraPositionToFitModel,
  // isMesh,
} from '../utils/threeUtils';

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
export const createRenderer = (
  width: number,
  height: number,
  canvas?: HTMLCanvasElement | null,
) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas || undefined,
  });

  renderer.setSize(width, height, false);

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
  cameraControls.target.copy(target);
  cameraControls.update();
};

/**
 * Set Camera Position
 */
export const setCameraPosition = (
  camera: THREE.PerspectiveCamera,
  position: THREE.Vector3,
) => {
  camera.position.copy(position);

  // camera.updateProjectionMatrix();
};

export interface SceneOptions {
  placeholder: HTMLCanvasElement | null;
}

export const createScene = ({ placeholder }: SceneOptions) => {
  const width = placeholder ? placeholder.clientWidth : 0;
  const height = placeholder ? placeholder.clientHeight : 0;

  const scene = new THREE.Scene();
  let models: Array<THREE.Object3D> = [];

  const camera = createCamera(width / height);
  const renderer = createRenderer(width, height, placeholder);

  renderer.setSize(width, height, false);
  const cameraControls = createCameraControls(camera, renderer);
  const cameraLight = createCameraLight();

  scene.add(camera);
  camera.add(cameraLight);
  cameraControls.update();

  /**
   * TODO: make nice replacement
   */
  if (placeholder) {
    // placeholder.innerHTML = '';
    // placeholder.appendChild(renderer.domElement);
  }

  /**
   * Clear Scene
   */
  const clearScene = () => {
    models.forEach((model) => {
      scene.remove(model);
    });
    models = [];
    // renderer.dispose();

    // scene.traverse((object) => {
    //   if (!isMesh(object)) return;

    //   console.log('dispose geometry!');
    //   object.geometry.dispose();

    //   // if (object.material.isMaterial) {
    //   //   cleanMaterial(object.material);
    //   // } else {
    //   //   // an array of materials
    //   //   for (const material of object.material) cleanMaterial(material);
    //   // }
    // });
  };

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
    // const { clientWidth, clientHeight } = placeholder;
    updateCameraSize(camera, width, height);
    updateRendererSize(renderer, width, height);
  };

  /**
   * Add Objects to scene
   */
  const add = (object: THREE.Object3D) => {
    models.push(object);
    scene.add(object);
  };

  /**
   * const animate
   */
  const animate = () => {
    render();
    cameraControls.update();
  };

  /**
   * Start render animation loop
   */
  const animationLoop = () => {
    animate();
    requestAnimationFrame(animationLoop);
  };

  /**
   * Updates the camera projection matrix. Must be called after change of parameters.
   */
  const updateCameraMatrix = () => {
    camera.updateProjectionMatrix();
  };

  /**
   * Focus camera at object center
   */
  const cameraFocusObject = (object: THREE.Object3D) => {
    const center = getBoundingBoxCenter(object);
    setCameraTarget(cameraControls, center);
    updateCameraMatrix();
  };

  /**
   * Fit Object to camera view
   */
  const fitObjectToView = (object: THREE.Object3D) => {
    const position = getCameraPositionToFitModel(object);
    setCameraPosition(camera, position);
    updateCameraMatrix();
  };

  // TODO: Run animation loop ???
  animationLoop();

  return {
    scene,
    render,
    add,
    resize,
    animate,
    cameraFocusObject,
    fitObjectToView,
    clearScene,
  };
};
