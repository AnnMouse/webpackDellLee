const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode:"development",
    devtool:'cheap-module-eval-source-map',
    entry:{
        main:'./src/index.js'
    },
    devServer:{
        contentBase:'./dist',
        open:true,
        port:8090
        // proxy:{
        //     './api':'http://localhost:3000'
        // }
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
                    limit:2048
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
        }]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'src/index.html'}),
        new CleanWebpackPlugin()],
    output:{
        publicPath:'/',
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    }
}