const path = require("path");

const config = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  mode: 'development',
  node: {
    __dirname: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.less$/,
        use: 'less-loader'
      }
    ]
  }
};

module.exports = config;
