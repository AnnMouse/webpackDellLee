const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry:{
        main:'./src/index.js',
    },
    module:{
        rules:[{
            test:/\.(jpg|png|gif)$/,
            use:{
                loader:'url-loader',
                options:{
                    // 占位符
                    name:'[name]_[hash].[ext]',
                    outputPath:'images/',
                    limit:20480
                }
            }
        },{
            test:/\.(eot|ttf|svg|woff)$/,
            use:['file-loader']
        },{ test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader", 
            // options:{
            //     // presets:[["@babel/preset-env",{
            //     //     useBuiltIns:'usage',
            //     //     targets:{
            //     //         chrome:'67'
            //     //     }                 
            //     // }]]
            //     "plugins": [["@babel/plugin-transform-runtime",{
            //         "absoluteRuntime": false,
            //         "corejs": 2,
            //         "helpers": true,
            //         "regenerator": true,
            //         "useESModules": false
            //     }]]
            // }
        }
    ]},
    plugins:[
        new HtmlWebpackPlugin({template:'src/index.html'}),
        new CleanWebpackPlugin(),
    ],
    output:{
        filename:'[name].js',
        chunkFilename:'[name].chunk.js',
        path:path.resolve(__dirname,'../dist')
    },
    optimization:{
        usedExports:true,
        splitChunks: {
            chunks: "all",
        }
    }
}