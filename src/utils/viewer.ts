import { createScene } from './scene';
import Pig from './pig';

interface ViewerConfig {
  placeholder: HTMLElement;
}

const viewer = (config: ViewerConfig) => {
  const scene = createScene({ placeholder: config.placeholder });

  const pig = new Pig();
  scene.add(pig.bodyGroup);

  const load = () => console.log('loading... ');

  return { load };
};

export default viewer;
