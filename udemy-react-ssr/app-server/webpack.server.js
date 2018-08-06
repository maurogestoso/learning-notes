const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpackNodeExternals = require("webpack-node-externals");

const serverConfig = {
  // Inform Webpack that we're building a bundle for Node
  target: "node",

  // root file of our application
  entry: path.resolve(__dirname, "src/index.js"),

  // where to put the generated bundle
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  // excludes from the bundle external dependencies
  // i.e. dependencies in node_modules
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);
