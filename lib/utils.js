let portfinder = require('portfinder');

module.exports = {

  isDevServer: function(compilerOptions) {
    let devServer = compilerOptions.devServer;
    return devServer; // && process.stdout.isTTY;
  },

  getValidPort: function(basePort) {
    basePort = basePort || 8000;
    portfinder.basePort = basePort;
    return portfinder.getPortPromise();
  }
};
