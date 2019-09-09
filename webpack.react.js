const webpack = require('webpack')
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]',
    // libraryTarget: 'var', // var,commonjs,umd,
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json'),
    }),
  ],
}
