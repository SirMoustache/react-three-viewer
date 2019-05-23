import * as React from 'react';

import viewer from './utils/viewer';

const useViewer = (elementRef: React.MutableRefObject<HTMLElement>) => {
  React.useEffect(() => {
    console.log('useViewer hook');
    viewer({
      placeholder: elementRef.current,
    }).render();
  });

  const render = () => console.log('render');

  return { render };
};

export default useViewer;
