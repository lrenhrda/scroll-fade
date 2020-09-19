const path = require('path');

module.exports = {
  entry: './es6/demo.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'demo'),
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