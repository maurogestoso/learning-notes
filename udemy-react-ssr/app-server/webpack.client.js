const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");

const clientConfig = {
  // root file of our application
  entry: path.resolve(__dirname, "src/client/client.js"),

  // where to put the generated bundle
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  }
};

module.exports = merge(baseConfig, clientConfig);
