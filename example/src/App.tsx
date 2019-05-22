import React, { useEffect } from 'react';
import HelloWorld, { useViewer } from 'react-three-viewer';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const {} = useViewer();
  useEffect(() => {
    console.log('useViewwr ');
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HelloWorld />
        <p>
          Edit  <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
