import * as React from 'react';

const useViewer = () => {
  React.useEffect(() => {
    console.log('useViewer');
  });

  const render = () => console.log('render');

  return { render };
};

export default useViewer;
