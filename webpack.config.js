const webpack = require("webpack");

var path = require("path");
const autoprefixer = require("autoprefixer");
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
      ,
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  browsers: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9" // React doesn't support IE8 anyway
                  ],
                  flexbox: "no-2009"
                })
              ]
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
