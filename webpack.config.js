const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = true;
/* Create a separate object, e.g. NODE_ENV and populate it only on development */
let NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  devtool: 'cheap-source-map',
  entry: './src/app.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader' 
        },
      },
      {
        test: /\.scss$/,
        use:  [ 
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 1234,
  },
  plugins: [
    /* hot module replacement */
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {from:'src/assets/images',to:'images'}
    ]),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
  ]
};