import * as THREE from 'three';

import { createCamera } from '../scene';

describe('createCamera', () => {
  it('shoul return PerspectiveCamera instance', () => {
    const placeholder = document.createElement('div');
    const camera = createCamera(placeholder);

    expect(camera).toBeInstanceOf(THREE.PerspectiveCamera);
  });
});
