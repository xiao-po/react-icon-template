const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = WebpackMerge.merge(base, {
  entry: [
    "index.ts",
  ].map(p => path.join(__dirname, `../lib/${p}`)),
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "index.js",
    library: 'react-components',
    libraryTarget: 'umd', // 采用通用模块定义
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader?modules'],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css" // 提取后的css的文件名
    }),

    new CleanWebpackPlugin()
  ],
  externals: { // 定义外部依赖，避免把react和react-dom打包进去
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  },
})