import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { createCanvas } from 'canvas';

import {
  createCamera,
  // createRenderer,
  // createCameraControls
} from '../viewer/scene/scene';

describe('createCamera', () => {
  it('shoul return a PerspectiveCamera instance', () => {
    // const placeholder = document.createElement('div');
    const ratio = 1;
    const camera = createCamera(ratio);

    expect(camera).toBeInstanceOf(THREE.PerspectiveCamera);
  });
});

// describe('createRenderer', () => {
//   it('should return a WebGLRenderer instance', () => {
//     const placeholder = document.createElement('div');
//     const canvas = document.createElement('canvas');
//     const renderer = createRenderer(placeholder, canvas);

//     expect(renderer).toBeInstanceOf(THREE.WebGLRenderer);
//   });
// });

// describe('createCameraControls', () => {
//   it('should return a OrbitControls instance', () => {
//     const placeholder = document.createElement('div');
//     const camera = createCamera(placeholder);
//     const renderer = createRenderer(placeholder);
//     const cameraControls = createCameraControls(camera, renderer);

//     expect(cameraControls).toBeInstanceOf(OrbitControls);
//   });
// });
