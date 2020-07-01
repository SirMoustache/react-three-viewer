/**
 * Absolute imports
 */
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

/**
 * Utils
 */
import { createDefaultMaterial } from '../utils/materialUtils';

export const parseStl = (file: ArrayBuffer) => {
  const loader = new STLLoader();

  const geometry = loader.parse(file);
  const material = createDefaultMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};
