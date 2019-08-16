# react-three-viewer

## Scripts

### `npm start`

Start dev build in watch mpde

### `npm run build`

Prod build

### `npm test`

Run tests

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
