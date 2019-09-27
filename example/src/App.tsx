import React, { useEffect, useRef, useState } from 'react';
import HelloWorld, { useViewer } from 'react-three-viewer';
import './App.css';

const App: React.FC = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [url, setUrl] = useState(
    'https://cdn.thingiverse.com/assets/10/3b/f2/b5/f2/xbox_wheel_wide_use_lowProfile_pivotAndRack.stl',
  );
  const { load, fetch, addPig } = useViewer(elementRef);

  useEffect(() => {
    console.log('addPig useEffect ');
    addPig();
  }, []);

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

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const urlValue = event.target.value;
    setUrl(urlValue);
  };

  const handleFileFetch = () => {
    fetch(url);
  };

  return (
    <div className="App">
      <header className="App__header">
        <h2>Upload 3d Model</h2>
        {/* <HelloWorld /> */}
      </header>

      <section className="files">
        <input type="file" onChange={handleFileChange} />
      </section>

      <section className="files">
        <input type="text" value={url} onChange={handleUrlChange} />
        <button onClick={handleFileFetch}>Fetch</button>
      </section>

      <section>
        <div className="viewer" ref={elementRef} />
      </section>
    </div>
  );
};

export default App;
