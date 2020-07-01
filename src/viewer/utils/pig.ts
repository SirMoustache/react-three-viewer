import * as THREE from 'three';

const colors = {
  pigColor: '#ffaeae',
  pigNoseColor: '#e09393',
  floorColor: 0xb5e5d9,
};

const materials = {
  pigMaterial() {
    return new THREE.MeshStandardMaterial({
      color: colors.pigColor,
    });
  },
  pigNoseMaterial() {
    return new THREE.MeshStandardMaterial({
      color: colors.pigNoseColor,
    });
  },
  pigEyeMaterial() {
    return new THREE.MeshStandardMaterial({
      color: '#fff',
    });
  },
  floorMaterial() {
    return new THREE.MeshPhongMaterial({
      color: 0xb5e5d9,
    });
  },
};

class Pig {
  bodyGroup: THREE.Group;

  body: THREE.Mesh;

  nose: THREE.Mesh;

  leftEye: THREE.Mesh;

  rightEye: THREE.Mesh;

  constructor() {
    this.bodyGroup = new THREE.Group();
    // Pig Body
    this.body = new THREE.Mesh(
      new THREE.BoxGeometry(10, 8, 10),
      materials.pigMaterial(),
    );
    this.body.castShadow = true;
    this.body.receiveShadow = true;

    // Pig Nose
    this.nose = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      materials.pigNoseMaterial(),
    );
    this.nose.position.z = 5;
    this.nose.castShadow = true;
    this.nose.receiveShadow = true;

    // Pig Left Eye
    this.leftEye = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 1),
      materials.pigEyeMaterial(),
    );
    this.leftEye.position.z = 5;
    this.leftEye.position.y = 2;
    this.leftEye.position.x = 2;

    // Pig Left Eye
    this.rightEye = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 1),
      materials.pigEyeMaterial(),
    );
    this.rightEye.position.z = 5;
    this.rightEye.position.y = 2;
    this.rightEye.position.x = -2;

    // Body Group
    this.bodyGroup.position.y = 5;
    this.bodyGroup.add(this.body);
    this.bodyGroup.add(this.nose);
    this.bodyGroup.add(this.leftEye);
    this.bodyGroup.add(this.rightEye);
  }
}

export default Pig;
