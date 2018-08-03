const path = require("path");

module.exports = {
  // root file of our application
  entry: path.resolve(__dirname, "src/client/client.js"),

  // where to put the generated bundle
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
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
