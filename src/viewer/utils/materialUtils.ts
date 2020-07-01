import * as THREE from 'three';

export const createDefaultMaterialColor = () => new THREE.Color(0x808080);

export type DefaultMaterialOptions = {
  color?: THREE.Color;
};

export const createDefaultMaterial = (options?: DefaultMaterialOptions) => {
  const defaultOptions = { color: createDefaultMaterialColor() };
  // options = Object.assign({}, defaultOptions, options);

  return new THREE.MeshPhongMaterial({
    ...options,
    ...defaultOptions,
  });
};
