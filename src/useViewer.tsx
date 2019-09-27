/**
 * Absolute imports
 */
import React, { useEffect, useRef } from 'react';

/**
 * Viewer
 */
import createViewer, { Viewer } from './utils/viewer';

const useViewer = (elementRef: React.MutableRefObject<HTMLElement | null>) => {
  const testViewer = useRef<Viewer>();

  useEffect(() => {
    console.log('createViewer trigger', elementRef.current);
    testViewer.current = createViewer({
      placeholder: elementRef.current,
    });
  }, [elementRef.current]);

  // const render = () => console.log('render');

  return {
    load: (file: File) => {
      if (testViewer.current) {
        testViewer.current.load(file);
      }
    },
    fetch: (url: string) => {
      if (testViewer.current) {
        testViewer.current.fetch(url);
      }
    },
    addPig: () => {
      if (testViewer.current) {
        testViewer.current.addPig();
      }
    },
  };
};

export default useViewer;
