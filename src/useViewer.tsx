/**
 * Absolute imports
 */
import { useEffect, useRef } from 'react';

/**
 * Viewer
 */
import createViewer, { Viewer } from './utils/viewer';

const useViewer = () => {
  const testViewer = useRef<Viewer>();
  const placeholderRef = useRef<HTMLElement | null>(null);

  const setRef = (el: HTMLElement | null) => {
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
    if (testViewer.current) {
      testViewer.current.load(file);
    }
  };
  const fetch = (url: string) => {
    if (testViewer.current) {
      testViewer.current.fetch(url);
    }
  };
  const addPig = () => {
    if (testViewer.current) {
      testViewer.current.addPig();
    }
  };

  return [
    setRef,
    {
      load,
      fetch,
      addPig,
    },
  ] as const;
};

export default useViewer;
