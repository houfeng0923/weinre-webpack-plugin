let path = require('path');
let _ = require('./utils');

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
    let optionsPromise = this.updateOptions(compiler);
    optionsPromise.catch(err => console.error(err));

    // for webpack 4
    if (compiler.hooks) {
      compiler.hooks.entryOption.tap("WeinreWebpackPlugin", (context, entry) => {
        this.initEntry(entry);
      });

      compiler.hooks.done.tapAsync("WeinreWebpackPlugin", (stats, callback) => {
        setTimeout(() => {
          this.startServer();
          callback();
        });
      });
    } else {
      compiler.plugin('entry-option', (context, entry) => {
        this.initEntry(entry);
      });

      compiler.plugin('done', () => {
        this.startServer();
      });
    }
  }

  updateOptions(compiler) {
    let options = this.options;
    let compilerOptions = compiler.options;
    if (_.isDevServer(compilerOptions)) {
      if (compilerOptions.devServer.host && !options.boundHost) {
        // update options.host
        options.boundHost = compilerOptions.devServer.host;
      }
    }
    // TODO async update port
    return _.getValidPort(compilerOptions, options.httpPort).then((port) => {
      options.httpPort = port;
      return options;
    });
  }

  initEntry(entry) {
    let { boundHost, httpPort } = this.options;
    let weinreClient = path.resolve(__dirname, '../client');
    let insertUrl = `http://${boundHost}:${httpPort}/target/target-script-min.js#anonymous`;
    let weinreEntry = `${weinreClient}?${insertUrl}`;

    Object.keys(entry).forEach(function(key) {
      entry[key].push(weinreEntry);
    });
  }

  startServer() {
    if (this.options.runServer && !this.weinreServer) {
      this.weinreServer = startServer(this.options);
    }
  }
}

function startServer(opts) {
  let weinre = require('../weinre/lib/weinre');
  return weinre.run(opts);
};

module.exports = WeinreWebpackPlugin;
