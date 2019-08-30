import React, { useEffect, useRef } from 'react';
import HelloWorld, { useViewer } from 'react-three-viewer';
import './App.css';

const App: React.FC = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { load, addPig } = useViewer(elementRef);

  useEffect(() => {
    console.log('addPig useEffect ');
    addPig();
  }, [addPig]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList) {
      return;
    }

    const file = fileList[0];

    if (!file) {
      return;
    }

    load(file);
  };

  return (
    <div className="App">
      <header className="App__header">
        <h2>Upload 3d Model</h2>
        <HelloWorld />
      </header>

      <section className="files">
        <input type="file" onChange={handleFileChange} />
      </section>

      <section>
        <div className="viewer" ref={elementRef} />
      </section>
    </div>
  );
};

export default App;
