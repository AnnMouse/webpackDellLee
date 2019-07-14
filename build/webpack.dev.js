const webpack = require('webpack');
const merge=require('webpack-merge');
const commonConfig=require('./webpack.common.js');
const devConfig = {
    // mode:"production",
    mode:"development",
    // devtool:'cheap-module-source-map',
    devtool:'cheap-module-eval-source-map',
    devServer:{
        contentBase:'./dist',
        open:true,
        port:8080,
        hot:true,
    },
    module:{   
        rules:[{
            test:/\.scss$/,
            use:[
            'style-loader',
            {
                loader:'css-loader',
                options:{
                    importLoaders:2,
                }
            },
            'sass-loader',
            'postcss-loader']
        },{
            test:/\.css$/,
            use:[
            'style-loader',
            'css-loader',
            'postcss-loader']
        }]           
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    output:{
        filename:'[name].[contenthash].js',
        chunkFilename:'[name].[contenthash].js',
    },
}

module.exports = merge(commonConfig,devConfig);