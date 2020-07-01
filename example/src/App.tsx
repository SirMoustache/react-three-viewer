import React, { useEffect, useRef, useState } from 'react';
import HelloWorld, { useViewer } from 'react-three-viewer';
// import './App.css';

/**
 * Components
 */
import { ModelViewer } from './components';

const App: React.FC = () => {
  const [binds, { load, fetch, addPig }] = useViewer();

  return <ModelViewer />;
};

// const App: React.FC = () => {
//   const [binds, { load, fetch, addPig }] = useViewer();

//   return (
//     <div className="App">
//       <header className="App__header">
//         <h2>Upload 3d Model</h2>
//         <HelloWorld />
//       </header>

//       <section className="files">
//         <input type="file" />
//       </section>

//       <section className="files">
//         <input type="text" />
//         <button>Fetch</button>
//       </section>

//       <section>
//         <div className="viewer" ref={binds}/>
//       </section>
//     </div>
//   );
// };

export default App;
