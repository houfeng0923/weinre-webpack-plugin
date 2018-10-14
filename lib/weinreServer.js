let stop;


function startServer(opts) {
  let weinre = require('../weinre/lib/weinre');
  weinre.run(opts).then((handle) => stop = handle);
};

module.exports = {
  start(pluginOptions) {
    let { boundHost, httpPort } = pluginOptions;
    let insertUrl = `http://${boundHost}:${httpPort}/target/target-script-min.js#anonymous`;

    startServer(pluginOptions)
    return Promise.resolve(insertUrl);
  },

  stop() {
    if (typeof stop === 'function') stop();
  }
};
