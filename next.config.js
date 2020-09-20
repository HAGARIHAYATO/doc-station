const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
    }
  },
  webpack: (config, {defaultLoaders}) => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  }
};