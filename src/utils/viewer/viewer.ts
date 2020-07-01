/**
 * Utils
 */
import { createScene } from './scene/scene';
import { loadFile } from './loaders/localFileLoader';
import { fetchFile } from '../fetchFile';
import { parseStl } from './parsers/parseStl';

/**
 * Pig
 */
import Pig from '../pig';

interface ViewerConfig {
  placeholder: HTMLCanvasElement | null;
}

export type Viewer = {
  load: (file: File) => Promise<any>;
  fetch: (url: string) => Promise<any>;
  addPig: () => void;
  clearScene: () => void;
};

export const createViewer = (config: ViewerConfig): Viewer => {
  const scene = createScene({ placeholder: config.placeholder });

  const addPig = () => {
    const pig = new Pig();
    scene.add(pig.bodyGroup);
    scene.fitObjectToView(pig.bodyGroup);
    scene.cameraFocusObject(pig.bodyGroup);
  };

  const load = (file: File) =>
    loadFile(file)
      .then(([fileDataPromise]) => fileDataPromise)
      .then(parseStl)
      .then((model) => {
        scene.add(model);
        scene.fitObjectToView(model);
        scene.cameraFocusObject(model);
      });

  const fetch = (url: string) =>
    fetchFile(url)
      .then(([fileDataPromise]) => fileDataPromise)
      .then((file) => parseStl(file))
      .then((model) => {
        scene.add(model);
        scene.fitObjectToView(model);
        scene.cameraFocusObject(model);
      });

  const clearScene = () => {
    scene.clearScene();
  };

  return { load, fetch, addPig, clearScene };
};
