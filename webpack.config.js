const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/frontend/index.js'
  ],
  mode: 'development',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/\/node_modules\//],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: ['.js', '.json', '.jsx'],
    modules: [resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/frontend/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'public'),
    publicPath: '/',
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/index.html' }]
    },
    overlay: true,
    quiet: true
  },
  watchOptions: {
    poll: 1000
  }
}
