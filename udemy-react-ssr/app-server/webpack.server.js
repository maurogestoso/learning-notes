const path = require("path");

module.exports = {
  // Inform Webpack that we're building a bundle for Node
  target: "node",

  // root file of our application
  entry: path.resolve(__dirname, "src/index.js"),

  // where to put the generated bundle
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },

  // transpile every file with Babel
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            "react",
            "stage-0",
            ["env", { targets: { browsers: ["last 2 versions"] } }]
          ]
        }
      }
    ]
  }
};
