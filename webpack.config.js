const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode:"production",
    entry:{
        main:'./src/index.js',
        sub:'./src/index.js'
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
        publicPath:'http://cdn.com.cn',
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    }
}