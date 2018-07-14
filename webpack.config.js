const path = require('path')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.glsl$/,
        use: 'raw-loader'
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
}
