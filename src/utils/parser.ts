import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

import { createDefaultMaterial } from './materialUtils';

export const parseStl = (file: any) => {
  const loader = new STLLoader();

  const geometry = loader.parse(file);
  const material = createDefaultMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};
