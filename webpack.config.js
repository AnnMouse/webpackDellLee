const path = require('path');
module.exports = {
    mode:"production",
    entry:{
        main:'./src/index.js'
    },
    module:{
        rules:[{
            test:/\.(jpg|png|gif)$/,
            use:{
                loader:'url-loader',
                options:{
                    // 占位符
                    name:'[name]_[hash].[ext]',
                    outputPath:'images/'
                }
            }
        }]
    },
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}