let portfinder = require('portfinder');

module.exports = {

  isDevServer: function(compilerOptions) {
    let devServer = compilerOptions.devServer;
    return devServer && process.stdout.isTTY;
  },

  getValidPort: function(compilerOptions, basePort) {
    let devServerPort = compilerOptions.devServer.port;
    basePort = basePort || 8000;
    if (basePort === devServerPort) {
      basePort++;
    }
    portfinder.basePort = basePort;
    return portfinder.getPortPromise();
  }
};
