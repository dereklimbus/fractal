const path = require('path')

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.glsl$/,
        use: 'raw-loader',
        exclude: /node_modules/
      }
    ]
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
}
