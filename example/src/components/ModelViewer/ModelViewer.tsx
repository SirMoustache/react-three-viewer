/**
 * Absolute imports
 */
import React, { useEffect, useRef, useState } from 'react';
import HelloWorld, { useViewer } from 'react-three-viewer';
import styled from 'styled-components';

/**
 * Styles
 */
const Root = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 400px;
`;

const MainAree = styled.div``;

const Aside = styled.div`
  background-color: #282c34;
  color: white;
  padding: 0 36px;
`;

const CanvasWrap = styled.canvas`
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;
  }

  canvas {
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
`;

const ModelViewer = () => {
  const [url, setUrl] = useState(
    'https://cdn.thingiverse.com/assets/10/3b/f2/b5/f2/xbox_wheel_wide_use_lowProfile_pivotAndRack.stl',
  );
  const [binds, { load, fetch, addPig, clearScene }] = useViewer();

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

  const handleFileFetch = (tsr: any) => {
    fetch(url);
  };

  return (
    <Root>
      <MainAree>
        <CanvasWrap ref={binds} />
      </MainAree>
      <Aside>
        <section className="files">
          <h2>Upload 3d Model</h2>
          <input type="file" onChange={handleFileChange} />
        </section>

        <section className="files">
          <h2>Fetch by url</h2>
          <input type="text" value={url} onChange={handleUrlChange} />
          <button onClick={handleFileFetch}>Fetch</button>
        </section>

        <section className="files">
          <h2>Add example</h2>
          <button onClick={addPig}>Add Mr. Pig</button>
        </section>

        <section className="files">
          <h2>Clear Scene</h2>
          <button onClick={clearScene}>Clear</button>
        </section>
      </Aside>
    </Root>
  );
};

export default ModelViewer;
