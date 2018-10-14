# weinre-webpack-plugin

**THIS SERVER SHOULD BE USED FOR DEVELOPMENT ONLY!**

**DO NOT USE IT IN PRODUCTION!**

It's the integrated [weinre](https://developer.mozilla.org/zh-CN/docs/Archive/B2G_OS/Platform/Gaia/Weinre%E8%BF%9C%E7%A8%8B%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7) for [webpack](https://webpack.js.org/).

## install

    npm install --save-dev weinre-webpack-plugin

## usage

```diff
// webpack.config.js
+ const WeinreWebpackPlugin = require('weinre-webpack-plugin');
+ // default options for weinre
+ const opts = {
+   // httpPort: 8000,
+   // boundHost: '0.0.0.0',
+   verbose: false,
+   debug: false,
+   readTimeout: 5,
+ };
module.exports = {
  // ...
  plugins: [
+  new WeinreWebpackPlugin(opts)
  ]
}

```


## more

* [weinre lib](https://www.npmjs.com/package/weinre)
