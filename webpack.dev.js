
let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let baseConfig = require('./webpack.base.js');
let merge = require('webpack-merge');
let config = require('./config.js');

module.exports = merge(baseConfig, {
    devtool: "source-map",
    output: {
        path: path.join(__dirname, '/dev'),
        filename: 'bundle.js',
        publicPath: config.dev.publicPath,
        chunkFilename: '[id].[chunkhash].js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dev'),
        open: true,
        port: 8888,
        publicPath: config.dev.publicPath
    }
    ,
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: 'head',
            title: 'test',
            publicPath: config.dev.publicPath
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/libs'),
                to: path.join(__dirname, 'dev/libs')
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/resource'),
                to: path.join(__dirname, 'dev/resource')
            }
        ])
    ]
});

