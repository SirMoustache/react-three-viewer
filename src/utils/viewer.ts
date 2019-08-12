import { createScene } from './scene';
import { loadFile } from './localFileLoader';
import { parseStl } from './parser';
import Pig from './pig';

interface ViewerConfig {
  placeholder: HTMLElement;
}

const viewer = (config: ViewerConfig) => {
  const scene = createScene({ placeholder: config.placeholder });

  const pig = new Pig();
  scene.add(pig.bodyGroup);

  const load = (file: File) =>
    loadFile(file)
      .then(([fileData]) => fileData)
      .then(parseStl)
      .then(scene.add);

  return { load };
};

export default viewer;
