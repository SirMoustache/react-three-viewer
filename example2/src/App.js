import React from 'react';

import HelloWorld, { useViewer } from 'react-three-viewer';

const App = () => {
  const example = useViewer();
  return (
    <div>
      <HelloWorld />
    </div>
  );
};
export default App;
