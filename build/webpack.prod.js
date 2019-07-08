const merge=require('webpack-merge');
const commonConfig=require('./webpack.common.js');

const prodConfig = {
    mode:"production",
    // mode:"development",
    devtool:'cheap-module-source-map',
    // devtool:'cheap-module-eval-source-map',
}

module.exports = merge(commonConfig,prodConfig);