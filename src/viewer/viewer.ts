/**
 * Utils
 */
import { createScene } from './scene/scene';
import { fetchFile, loadLocalFile } from './loaders';
import { parseStl } from './parsers/parseStl';

/**
 * Pig
 */
import Pig from '../utils/pig';

interface ViewerConfig {
  placeholder: HTMLCanvasElement | null;
}

export type Viewer = {
  /**
   * Load 3D model file to viewer
   */
  load: (file: File) => Promise<any>;
  /**
   * Fetch 3D model file by url
   */
  fetch: (url: string) => Promise<any>;
  /**
   * Add test mesh to scene
   */
  addPig: () => void;
  /**
   * Remove all models from scene
   */
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
    loadLocalFile(file)
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
