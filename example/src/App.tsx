import React, { useEffect, useRef } from 'react';
import HelloWorld, { useViewer } from 'react-three-viewer';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { load, addPig } = useViewer(elementRef);
  useEffect(() => {
    console.log('addPig useEffect ');
    addPig();
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const file = fileList[0];
      load(file);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HelloWorld />
        <hr />
        <input type="file" onChange={handleFileChange} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{ width: '200px', height: '200px' }} ref={elementRef}>
          tesst
        </div>
      </header>
    </div>
  );
};

export default App;
