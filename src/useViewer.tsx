/**
 * Absolute imports
 */
import { useEffect, useRef } from 'react';

/**
 * Viewer
 */
import { Viewer, createViewer } from './utils/viewer';

const useViewer = () => {
  const testViewer = useRef<Viewer>();
  const placeholderRef = useRef<HTMLCanvasElement | null>(null);

  const setRef = (el: HTMLCanvasElement | null) => {
    placeholderRef.current = el;
  };

  useEffect(() => {
    console.log('createViewer trigger');
    testViewer.current = createViewer({
      placeholder: placeholderRef.current,
    });
  }, []);

  // const render = () => console.log('render');

  const load = (file: File) => {
    if (!testViewer.current) return;

    testViewer.current.load(file);
  };

  const fetch = (url: string) => {
    if (!testViewer.current) return;

    testViewer.current.fetch(url);
  };

  const addPig = () => {
    if (!testViewer.current) return;

    testViewer.current.addPig();
  };

  const clearScene = () => {
    if (!testViewer.current) return;

    testViewer.current.clearScene();
  };

  return [
    setRef,
    {
      load,
      fetch,
      addPig,
      clearScene,
    },
  ] as const;
};

export default useViewer;
