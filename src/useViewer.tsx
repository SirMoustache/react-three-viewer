/**
 * Absolute imports
 */
import React, { useEffect, useRef } from 'react';

/**
 * Viewer
 */
import viewer, { Viewer } from './utils/viewer';

const useViewer = (elementRef: React.MutableRefObject<HTMLElement>) => {
  const testViewer = useRef<Viewer>();

  useEffect(() => {
    testViewer.current = viewer({
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
    addPig: () => {
      if (testViewer.current) {
        testViewer.current.addPig();
      }
    },
  };
};

export default useViewer;
