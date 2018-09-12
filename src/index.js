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

WeinreWebpackPlugin.prototype.apply = function(compiler) {
  let plugin = this;
  let options = this.options;
  let weinreClient = path.resolve(__dirname, '../client');
  let insertUrl = `http://${options.boundHost}:${options.httpPort}/target/target-script-min.js#anonymous`;
  let weinreEntry = `${weinreClient}?${insertUrl}`;
  compiler.plugin('entry-option', function(context, entrys) {
    Object.keys(entrys).forEach(function(key) {
      entrys[key].push(weinreEntry);
    });
  });

  compiler.plugin('done', function() {
    if (options.runServer && !this.weinreServer) {
      this.weinreServer = startServer(plugin.options);
    }
  });
};

function startServer(opts) {
  let weinre = require('../weinre/lib/weinre');
  return weinre.run(opts);
};

module.exports = WeinreWebpackPlugin;
