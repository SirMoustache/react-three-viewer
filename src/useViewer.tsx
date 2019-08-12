/**
 * Absolute imports
 */
import React, { useEffect, useRef } from 'react';

/**
 * Viewer
 */
import viewer from './utils/viewer';

const useViewer = (elementRef: React.MutableRefObject<HTMLElement>) => {
  const testViewer = useRef<{
    load: (val: any) => any;
  }>();

  useEffect(() => {
    testViewer.current = viewer({
      placeholder: elementRef.current,
    });
  }, [elementRef.current]);

  // const render = () => console.log('render');

  return {
    // @ts-ignore
    // load: testViewer.current.load,
    load: (val: any) => val,
  };
};

export default useViewer;
