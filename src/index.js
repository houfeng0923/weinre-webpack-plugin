let path = require('path');
let _ = require('./utils');

let defaultOpts = {
  httpPort: 8000,
  boundHost: '0.0.0.0',
  verbose: false,
  debug: false,
  readTimeout: 5,
  runServer: true,
};

function WeinreWebpackPlugin(options) {
  let opts = (this.options = _.extend(defaultOpts, options));
  if (!opts.deathTimeout) {
    opts.deathTimeout = 3 * opts.readTimeout;
  }
  this.weinreServer = null;
}

WeinreWebpackPlugin.prototype.pushEntry = function(entry) {
  let options = this.options;
  let weinreClient = path.resolve(__dirname, '../client');
  let insertUrl = `http://${options.boundHost}:${options.httpPort}/target/target-script-min.js#anonymous`;
  let weinreEntry = `${weinreClient}?${insertUrl}`;

  Object.keys(entry).forEach(function(key) {
    entry[key].push(weinreEntry);
  });
}

WeinreWebpackPlugin.prototype.startServer = function() {
  if (this.options.runServer && !this.weinreServer) {
    this.weinreServer = startServer(this.options);
  }
}

WeinreWebpackPlugin.prototype.apply = function(compiler) {
  let plugin = this;
  let options = this.options;
  let weinreClient = path.resolve(__dirname, '../client');
  let insertUrl = `http://${options.boundHost}:${options.httpPort}/target/target-script-min.js#anonymous`;
  let weinreEntry = `${weinreClient}?${insertUrl}`;

  // for webpack 4
  if (compiler.hooks) {
    compiler.hooks.entryOption.tap("WeinreWebpackPlugin", function(context, entry) {
      plugin.pushEntry(entry);
    });

    compiler.hooks.done.tapAsync("WeinreWebpackPlugin", function() {
      plugin.startServer();
    });
  } else {
    compiler.plugin('entry-option', function(context, entry) {
      plugin.pushEntry(entry);
    });

    compiler.plugin('done', function() {
      plugin.startServer();
    });
  }
};

function startServer(opts) {
  let weinre = require('../weinre/lib/weinre');
  return weinre.run(opts);
};

module.exports = WeinreWebpackPlugin;
