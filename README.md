# react-three-viewer

## How to solve problems


### VS Code linter dont lint `*.ts` files
* Open VS config `Ctrl + Shift + P` and type `>Preferences: Open Settings (JSON)`
* Add next configs:
```json
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
```