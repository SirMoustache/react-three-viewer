/**
 * Absolute imports
 */
import { useEffect, useRef, useState } from 'react';

/**
 * Viewer
 */
import { Viewer, createViewer } from './viewer';

export type Status = 'idle' | 'loading' | 'fetching';

const useViewer = () => {
  const testViewer = useRef<Viewer>();
  const placeholderRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<Status>('idle');

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

    setStatus('loading');
    testViewer.current.load(file).then(() => {
      setStatus('idle');
    });
  };

  const fetch = (url: string) => {
    if (!testViewer.current) return;
    setStatus('fetching');
    testViewer.current.fetch(url).then(() => {
      setStatus('idle');
    });
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
      status,
    },
  ] as const;
};

export default useViewer;
