const path = require('path');

module.exports = {
  entry: './es6/test.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'test'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: path.join(__dirname, 'es6'),
        loader: 'babel-loader'  
      }
    ]
  }
};