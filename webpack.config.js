const webpack = require("webpack");

var path = require("path");
const config = {
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?http://localhost:3030/",
    "./client/app.jsx"
  ],
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        use: [
          { loader: "react-hot-loader/webpack" },
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react", "stage-2"],
              plugins: ["react-hot-loader/babel"]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "./client/app.jsx")],
    extensions: [".js", ".jsx"]
  }, 
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = config;
