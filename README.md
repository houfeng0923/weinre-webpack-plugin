# webpack-weinre


**THIS SERVER SHOULD BE USED FOR DEVELOPMENT ONLY!**

**DO NOT USE IT IN PRODUCTION!**

It's the integrated weinre for [webpack](http://webpack.github.io).


## install

    npm install --save-dev webpack-weinre

## usage

        var weinre = require('webpack-weinre');
        weinre.run({
            httpPort: 8000,
            boundHost: 'localhost',
            verbose: false,
            debug: false,
            readTimeout: 5
        });

        // ......

        var webpackDevConfig = {
            entry: {
                index: [
                    'webpack-weinre/client?' + weinre.callbackUrl , // <--
                    'webpack/hot/only-dev-server',
                    './index.js'
                ]
            }
        };


## more

 - [weinre](https://www.npmjs.com/package/weinre)
