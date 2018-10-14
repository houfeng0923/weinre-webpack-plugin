let path = require('path');
let utils = require('./lib/utils');
let startWeinreServer = require('./lib/startWeinreServer');

let defaultOpts = {
  httpPort: 8000,
  boundHost: null,
  verbose: false,
  debug: false,
  readTimeout: 5,
  runServer: true,
};

class WeinreWebpackPlugin {
  constructor(options) {
    let opts = this.options = Object.assign({}, defaultOpts, options);
    if (!opts.deathTimeout) {
      opts.deathTimeout = 3 * opts.readTimeout;
    }
    this.weinreServer = null;
  }

  apply(compiler) {
    let options = this.options;
    let compilerOptions = compiler.options;
    if (!utils.isDevServer(compilerOptions)) {
      console.error('need run with webpack dev server!');
      return;
    }
    this.updateOptions(compilerOptions);
    let weinreServerPromise = this.postWeinreProcess(compilerOptions);

    (compiler.hooks ? compiler.hooks.entryOption.tap.bind(compiler.hooks.entryOption, 'WeinreWebpackPlugin')
    : compiler.plugin.bind(compiler, 'entryOption'))((context, entry) => {
      this.initEntry(entry);
    });

    (compiler.hooks ? compiler.hooks.emit.tapAsync.bind(compiler.hooks.emit, 'WeinreWebpackPlugin')
    : compiler.plugin.bind(compiler, 'emit'))((compilation, callback) => {
      let getWeinreUrlFilePath = require.resolve('./client/getWeinreUrl.js');
        weinreServerPromise.then((weinreUrl) => {
          for (var basename in compilation.chunks) {
            let chunk = compilation.chunks[basename];
            let modules = chunk.getModules();
            let request = modules.map(module => module.request).find(request => request === getWeinreUrlFilePath);
            if (request) {
              let file = chunk.files.find(fileName => !fileName.endsWith('.map'));
              let asset = file && compilation.assets[file];
              let source = asset.source().replace(/__WEINRE_URL__/g, weinreUrl);
              asset.source = () => source;
              asset.size = () => source.length;
            }
          }
         callback();
        });
    });
    // todo stop server
  }

  updateOptions(compilerOptions) {
    let options = this.options;
    if (compilerOptions.devServer.host && !options.boundHost) {
      options.boundHost = compilerOptions.devServer.host;
    }
  }

  initEntry(entry) {
    let weinreChunkEntry = path.resolve(__dirname, './client');
    Object.keys(entry).forEach(function(key) {
      entry[key].push(weinreChunkEntry);
    });
  }

  postWeinreProcess(compilerOptions) {
    let devServerPort = compilerOptions.devServer.port;
    let weinrePort = this.options.httpPort;
    if (weinrePort === devServerPort) {
      weinrePort += 100;
    }
    return utils.getValidPort(weinrePort)
    .catch(console.error.bind(console, 'Weinre Webpack Plugin: '))
    .then((port) => this.options.httpPort = port)
    .then(() => {
      if (this.options.runServer && !this.weinreServer) {
        this.weinreServer = true;
        return startWeinreServer(this.options);
      }
    });
  }

}


module.exports = WeinreWebpackPlugin;
