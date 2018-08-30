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
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack-loader',
        options: {
          cwd: path.resolve(__dirname),
          files: [
            path.resolve(__dirname, 'Component.elm'),
            path.resolve(__dirname, 'ComponentWithPorts.elm'),
            path.resolve(__dirname, 'ComponentWithStaticProp.elm'),
          ],
        },
      },
    ],
    noParse: [/.elm$/],
  },
}
