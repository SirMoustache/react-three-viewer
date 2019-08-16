import { useEffect } from 'react';

import viewer from './utils/viewer';

const useViewer = (elementRef: React.MutableRefObject<HTMLElement>) => {
  useEffect(() => {
    console.log('useViewer hook!');
    viewer({
      placeholder: elementRef.current,
    }).load();
  });

  const render = () => console.log('render');

  return { render };
};

export default useViewer;
