const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'example.js'),
  output: {
    publicPath: '/',
    filename: 'example.js',
  },
  devServer: {
    contentBase: path.join(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader',
          options: {},
        },
      },
    ],
    noParse: [/.elm$/],
  },
}
