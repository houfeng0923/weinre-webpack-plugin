var weinre = require('weinre');
var utils = require('./utils');

var weinreOpts = {
  httpPort: 8000,
  boundHost: 'localhost',
  verbose: false,
  debug: false,
  readTimeout: 5
};

var callbackUrl ;

exports.run = function(opts){
    var callUrlTpl = 'http://{{boundHost}}:{{httpPort}}/target/target-script-min.js#anonymous';
    opts = utils.extend({}, weinreOpts, opts);
    if (opts.deathTimeout == null) {
        opts.deathTimeout = 3 * opts.readTimeout;
    }
    weinre.run(opts);

    exports.callbackUrl = callbackUrl = callUrlTpl.replace('{{boundHost}}', opts.boundHost)
                                                  .replace('{{httpPort}}', opts.httpPort);
    return callbackUrl;
};

