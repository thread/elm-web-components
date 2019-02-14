const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'example.js'),
  output: {
    publicPath: '/',
    filename: 'example.js',
  },
  devServer: {
    contentBase: path.join(__dirname),
    port: 8081,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack-loader',
        options: {},
      },
      {
        test: /\.js/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
    noParse: [/.elm$/],
  },
}
