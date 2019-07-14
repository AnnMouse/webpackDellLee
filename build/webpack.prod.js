const merge = require('webpack-merge');
const commonConfig=require('./webpack.common.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
    mode:"production",
    // mode:"development",
    devtool:'cheap-module-source-map',
    // devtool:'cheap-module-eval-source-map',
    module:{   
        rules:[{
            test:/\.scss$/,
            use:[
            {   
                loader:MiniCssExtractPlugin.loader   
            },
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
            {   
                loader:MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'postcss-loader']
        }]           
    },
    plugins:[
            new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}),new OptimizeCssAssetsPlugin({})],
    },
    output:{
        filename:'[name].[hash].js',
        chunkFilename:'[name].[hash].js',
    },
}

module.exports = merge(commonConfig,prodConfig);