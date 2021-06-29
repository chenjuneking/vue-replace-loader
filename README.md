# Vue-replace-loader
> Webpack loader for replacing strings of vue single-file component.

## Install
```bash
npm install vue-replace-loader --save-dev
# or yarn
yarn add vue-replace-loader --dev
```

## Usage

Suppose there are some special placeholders in your template, like `__ENV__`, `__PORT__`, `__REMOTE_CSS__`, and you want to replace them with variables when compiling.
```js
// my-component.vue
<template>
  <div data-env="__ENV__">
    System is running on port: {{port}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      port: '__PORT__',
    }
  },
}
</script>

<style>
@import "__REMOTE_CSS__";
</style>
```

All you need to do is define the regular expression and the value you want to replace in your webpack configuration file.
```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /.vue$/,
        use: [
          'vue-loader',
          {
            loader: 'vue-replace-loader',
            options: {
              values: [
                { regex: /__ENV__/g, replacement: process.env.NODE_ENV },
                { regex: /__PORT__/g, replacement: process.env.PORT },
                { regex: /__REMOTE_CSS__/g, replacement: process.env.REMOTE_CSS },
              ],
            },
          },
        ],
      },
    ],
  },
  // ...
}
```
