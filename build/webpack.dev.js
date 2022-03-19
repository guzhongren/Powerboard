const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const PORT = 4321
const _HOST = 'localhost'
const HOST = `http://${_HOST}`
const URL = `${HOST}:${PORT}`

module.exports = merge(common, {
  entry: [
    `webpack-dev-server/client?${URL}`,
    'webpack/hot/only-dev-server',
    '../src/index.tsx',
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    compress: true,
    port: PORT,
    host: _HOST,
    historyApiFallback: true,
  },
  mode: 'development',
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
