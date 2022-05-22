const {
  withModuleFederation,
} = require("@module-federation/nextjs-mf");
const path = require('path');

module.exports = {
  future: { webpack5: true },
  images: {
    domains: ['upload.wikimedia.org'],
  },
  webpack: (config, options) => {
    const { isServer } = options;

    const mfConf = {
      name: "shell",
      library: {
        type: config.output.libraryTarget,
        name: "shell",
      },
      remotes: {
        app2: isServer
        ? path.resolve(
            __dirname,
            '../app2/.next/server/static/runtime/app2RemoteEntry.js'
          )
        : 'app2', 
      },
      exposes: {
      },
    };
    
    config.cache = false;
    withModuleFederation(config, options, mfConf);
    return config;
  },

  webpackDevMiddleware: (config) => {
    return config;
  },
};