const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode:'production',
    entry:{
        vendors:['lodash'],
        react:['react','react-dom'],
    },
    output:{
        filename:'[name].dll.js',
        path:path.resolve(__dirname,'../dll'),
        library:'[name]' // 打包好的文件可通过全局变量暴露出来
    },
    plugins:[
        new webpack.DllPlugin({
            name:'[name]',
            path:path.resolve(__dirname,'../dll/[name].manifest.json'),
        })
    ]
}