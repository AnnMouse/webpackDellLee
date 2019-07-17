const path = require('path');
const fs=require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const makePlugins = (configs) => {
    const plugins=[new CleanWebpackPlugin()];
    const files = fs.readdirSync(path.resolve(__dirname,'../dll'));

    Object.keys(configs.entry).forEach(item => {
        plugins.push(new HtmlWebpackPlugin({
            template:'src/index.html',
            filename:`${item}.html`,
            chunks:['runtime','vendors',item]
        }));
    })

    files.forEach(file => {
        if(/.*\.dll.js/.test(file)){
            plugins.push(new AddAssetHtmlWebpackPlugin({
                filepath:path.resolve(__dirname,'../dll',file)
            }));
        }
        if(/.*\.manifest.js/.test(file)){
            plugins.push(new webpack.DllReferencePlugin({
                manifest:path.resolve(__dirname,'../dll',file)
            }));
        }
    });
    return plugins;
}
// 使用node动态添加plugin
// const plugins=[

//     new HtmlWebpackPlugin({
//         template:'src/index.html',
//         filename:'list.html',
//         chunks:['runtime','vendors','list']
//     }),
    
// ];

const configs = {
    entry:{
        index:'./src/index.js',
        list:'./src/List.js'
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
                    limit:10240
                }
            }
        },{
            test:/\.(eot|ttf|svg|woff)$/,
            use:['file-loader']
        },{ test: /\.js$/, 
            exclude: /node_modules/, 
            use:[{
                loader: 'babel-loader', 
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
    optimization:{
        runtimeChunk:{
            name:'runtime'
        }, // 最新版本不用额外设置
        usedExports:true, // 表示pakagejson中指定的类似文件不会进行tree shaking
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
                }
            }
        }
    },
    performance:false, // 不显示打包性能问题
    output:{
        path:path.resolve(__dirname,'../dist')
    },
}

configs.plugins=makePlugins(configs);

module.exports = configs;