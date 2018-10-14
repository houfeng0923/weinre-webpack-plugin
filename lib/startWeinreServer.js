function startServer(opts) {
  let weinre = require('../weinre/lib/weinre');
  weinre.run(opts);
};

module.exports = function(pluginOptions) {
  let { boundHost, httpPort } = pluginOptions;
  let insertUrl = `http://${boundHost}:${httpPort}/target/target-script-min.js#anonymous`;

  startServer(pluginOptions);
  return Promise.resolve(insertUrl);
}
