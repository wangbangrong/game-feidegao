
let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let baseConfig = require('./webpack.base.js');
let merge = require('webpack-merge');
let uglify = require('uglifyjs-webpack-plugin');
let config = require('./config.js');

module.exports = merge(baseConfig,{
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.[chunkhash].js',
        publicPath: config.build.publicPath,
        chunkFilename: '[id].[chunkhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject : 'head',
            publicPath : config.build.publicPath
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/libs'),
                to: path.join(__dirname, 'dist/libs')
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'src/resource'),
                to: path.join(__dirname, 'dist/resource')
            }
        ])
        ,
        new uglify()
    ]

});

