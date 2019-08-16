import { createScene } from './scene';
import { loadFile } from './localFileLoader';
import { parseStl } from './parser';
import Pig from './pig';

interface ViewerConfig {
  placeholder: HTMLElement;
}

export type Viewer = {
  load: (file: File) => Promise<any>;
  addPig: () => void;
};

const createViewer = (config: ViewerConfig): Viewer => {
  const scene = createScene({ placeholder: config.placeholder });

  const addPig = () => {
    const pig = new Pig();
    scene.add(pig.bodyGroup);
  };

  const load = (file: File) =>
    loadFile(file)
      .then(([fileDataPromise]) => fileDataPromise)
      .then(fileDataPromise => fileDataPromise.promise)
      .then(parseStl)
      .then(scene.add);

  return { load, addPig };
};

export default createViewer;
