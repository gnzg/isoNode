const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = true;
/* TODO: Create a separate object, e.g. NODE_ENV and populate it only on development */

module.exports = env => {
  return { 
    mode: 'development',
    devtool: 'source-map',
    entry: './src/app.ts',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" },
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
      watchOptions: {
        ignored: /node_modules/
      },
      port: env.PORT
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
  }
};