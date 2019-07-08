const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    // mode:"production",
    mode:"development",
    // devtool:'cheap-module-source-map',
    devtool:'cheap-module-eval-source-map',
    entry:{
        main:'./src/index.js'
    },
    devServer:{
        contentBase:'./dist',
        open:true,
        port:8090,
        hot:true,
        hotOnly:true
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
            test:/\.(eot|ttf|svg|woff)$/,
            use:['file-loader']
        },{
            test:/\.css$/,
            use:[
            'style-loader',
            'css-loader',
            'postcss-loader']
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
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
        usedExports:true,
    },
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    }
}