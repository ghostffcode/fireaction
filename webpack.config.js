const webpack = require('webpack')
const path = require('path')

const config = {
  entry: './lib/index.js',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fireaction.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: true,
      minimize: false
    }),
  ]
}

module.exports = config
