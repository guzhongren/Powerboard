const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');

module.exports = {
  entry: '../src/index.tsx',
  output: {
    filename: "[name]-[hash:7].js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "[chunkhash].js",
    publicPath: "",
  },
  context: path.resolve(__dirname, "../src"),
  devtool: "nosources-source-map",
  bail: true,
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'global',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
              importLoaders: 2,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ogg|mp3)$/,
        use: ["url-loader"],
      },
      {
        test: /\.(svg?)(\?[a-z0-9]+)?$/,
        use: ["url-loader"],
      },
    ]
  },
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "../src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  stats: {
    cached: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    modules: false,
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        enabled: true,
        configFile: path.resolve(__dirname, "../tsconfig.json"),
        tslint: path.resolve(__dirname, "../tslint.json"),
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:7].css",
      chunkFilename: "[id].[hash:7].css"
    }),
    new HTMLWebpackPlugin({
      template: "../src/app.html",
      filename: "index.html",
    }),
    new GenerateSW(),
  ]
}
