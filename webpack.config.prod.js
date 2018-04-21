const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/frontend/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, 'public'),
    publicPath: '/'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/\/node_modules\//],
        use: ['babel-loader?cacheDirectory']
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
  devtool: 'source-map',
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/frontend/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          arrows: false,
          booleans: false,
          collapse_vars: false,
          comparisons: false,
          computed_props: false,
          hoist_funs: false,
          hoist_props: false,
          hoist_vars: false,
          if_return: false,
          inline: false,
          join_vars: false,
          keep_infinity: true,
          loops: false,
          negate_iife: false,
          properties: false,
          reduce_funcs: false,
          reduce_vars: false,
          sequences: false,
          side_effects: false,
          switches: false,
          top_retain: false,
          toplevel: false,
          typeofs: false,
          unused: false,

          // Switch off all types of compression except those needed to convince
          // react-devtools that we're using a production build
          conditionals: true,
          dead_code: true,
          evaluate: true
        },
        mangle: true,
        parallel: true
      }
    })
  ]
}
