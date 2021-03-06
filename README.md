# react-three-viewer



A simple library to view 3d models in react app build with [three.js](https://github.com/mrdoob/three.js/)

[codesandbox exampe](https://codesandbox.io/s/react-three-viewer-example-l1vni)

## Installation

It requires [three.js](https://github.com/mrdoob/three.js/) library to work

```bash
npm install react-three-viewer three
```

## How to use

```tsx
import { useViewer } from 'react-three-viewer';

const App: React.FC = () => {
  const [binds, { load }] = useViewer();

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
      </header>

      <section className="files">
        <input type="file" onChange={handleFileChange} />
      </section>

      <section>
        <div className="viewer" ref={binds} />
      </section>
    </div>
  );
};
```

## Hook API Methods

```javascript
const { load, fetch } = useViewer();
```

- `load(file: File)` - Load 3d file and add it to scene
- `fetch(url: string)` - Fetch 3d file by http and add it to scene

## Hook Config

```javascript
const {} = useViewer(elementRef);
```

- `elementRef` - Ref to element for viewer to append

## How to solve problems

### VS Code linter dont lint `*.ts` files

- Open VS config `Ctrl + Shift + P` and type `>Preferences: Open Settings (JSON)`
- Add next configs:

```json
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
```

### `no-unused-vars` ESLint error

The issue is that `typescript-eslint/no-unused-vars` simply tag types and interfaces
(that are imported or defined in the file) as unused, even if they are.
Well for my specific case I ended up with this workaround

```javascript
overrides: [
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    },
  },
];
```
