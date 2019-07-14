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
            use:[{
                loader: 'babel-loader', 
            },{
                loader:'imports-loader?this=>window'
            }]
            
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
        new webpack.ProvidePlugin({
            $:'jquery',
            _join:['lodash','join']
        }),
    ],
    optimization:{
        runtimeChunk:{
            name:'runtime'
        }, // 最新版本不用额外设置
        usedExports:true,
        splitChunks: {
            chunks: "all", 
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name:'vendors'
                },
                default:{
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    }
}