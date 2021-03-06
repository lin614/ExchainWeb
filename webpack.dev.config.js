const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const fs = require('fs')
const path = require('path')

fs.open('./src/config/env.js', 'w', function (err, fd) {
  const buf = 'export default "development";'
  fs.write(fd, buf, function (err, written, buffer) {})
})

module.exports = merge(webpackBaseConfig, {
  devtool: '#source-map',
  output: {
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js'
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/template/index.ejs',
      inject: false,
      favicon: path.resolve('./src/static/favicon.ico') //新增
    }),
    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      to: 'static',
      ignore: ['.*']
    }])
  ],
  devServer: {
    // // host: '127.0.0.1',
    // port: 4001,
    // proxy: {
    //   '/api': {
    //     target: 'http://service.exchain.com',
    //     changeOrigin: true
    //   }
    // },
    host: 'www.exchain.com',
    // host:'172.16.1.12',
    port: '80'
  }
})