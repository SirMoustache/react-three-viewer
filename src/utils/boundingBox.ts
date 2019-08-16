/**
 * Absolute imports
 */
import THREE from 'three';

export const isMesh = (object: any): object is THREE.Mesh => object.isMesh;
export const isGroup = (object: any): object is THREE.Group => object.isGroup;
export const isObject3D = (object: any): object is THREE.Object3D =>
  object.isObject3D;

/**
 * Get camera position to fit model in viewer
 */
export const getCameraPositionToFitModel = (model: any): THREE.Vector3 => {
  const boundingBox = getBoundingBox(model);
  const boundingSphere = getBoundingSphere(model);
  const modelCenter = getBoundingBoxCenter(model);
  const modelSize = getBoundingBoxSize(model);

  const cameraX = modelCenter.x;
  const cameraY =
    Math.sqrt(3) * boundingSphere.radius + boundingSphere.center.y;
  const cameraZ = boundingBox.max.z + modelSize.y;

  return new THREE.Vector3(cameraX, cameraY, cameraZ);
};

/**
 * Get bounding box of model or [[-1,-1,-1],[1,1,1]] if no model
 */
export const getBoundingBox = (
  model: THREE.Mesh | THREE.Group | THREE.Object3D,
): THREE.Box3 => {
  if (isMesh(model)) {
    model.geometry.computeBoundingBox();
    return model.geometry.boundingBox;
  }

  if (isGroup(model) || isObject3D(model)) {
    return new THREE.Box3().setFromObject(model);
  }

  return new THREE.Box3(
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(1, 1, 1),
  );
};

/**
 * Get bounding sphere of model
 */
export const getBoundingSphere = (
  model: THREE.Mesh | THREE.Group | THREE.Object3D,
): THREE.Sphere => {
  const boundingBox = getBoundingBox(model);
  const boundingSphere = new THREE.Sphere();
  boundingBox.getBoundingSphere(boundingSphere);

  return boundingSphere;
};

/**
 * Get size of model
 */
export const getBoundingBoxSize = (
  model: THREE.Mesh | THREE.Group | THREE.Object3D,
): THREE.Vector3 => {
  const boundingBox = getBoundingBox(model);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  return size;
};

/**
 * Get center of model
 */
export const getBoundingBoxCenter = (
  model: THREE.Mesh | THREE.Group | THREE.Object3D,
): THREE.Vector3 => {
  const boundingBox = getBoundingBox(model);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);

  return center;
};
