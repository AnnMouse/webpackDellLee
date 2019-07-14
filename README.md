# webpackDellLee
webpack 三种方式
## webpack  index.js 
## npx webpack index.js 
## npm run bundle (在package.json里script输入准备执行的命令)
## 输出部分描述
 - Hash  每次打包的唯一值
 - Chunks  每个js文件对应的id
 - Chunk Name  每个js文件对应的名字
 - mode  production:被压缩代码，development：不被压缩

# Loader
## file-loader
### loader中file-loader执行过程
 - 将图片拷贝到dist目录下，将生成的地址返回给变量
 - 可配置参数：输出名称、输出地址
 - 下载iconfont包，修改iconfont.css中url地址，安装引用icon即可
## url-loader
### 作用及用法
 - 与file-loader类似，将图片转化为base64，可设置limit属性，超过设置值则与file-loader一样拷贝图片
## 样式有关
### css-loader和style-loader
 - style-loader：将css-loader生成的样式挂载到html中的header部分.
 - css-loader:分析多个css之间的依赖关系，生成依赖树。
 ```
{
    test:/\.scss$/,
    use:[
    'style-loader',
    {
        loader:'css-loader',
        options:{
            importLoaders:2，
            modules:true
        }
    },
    'sass-loader',
    'postcss-loader']
}
 ```
 以上表示：
 importLoader:如果在css文件中，以import形式引用的scss文件也要先用当前loader往下的两个loader处理
 modules:表示scss 以模块的形式加载，样式只对当前模块适用，其他模块不受影响
 - sass-loader:将scss语法转化为css
 - postcss-loader:需创建postcss.config.js文件配置，添加autoprefixer插件（transfrom自动添加-webkit-transfrom）
 
 __注意__ loader的执行顺序是从下到上，从右到左，先将sass转化为css，再将css所有文件整合，传给style进行页面显示

 ## plugins
 类似于生命周期函数，可以在webpack运行到某个时刻的时候，帮你做一些事情
 ### HtmlWebpackPlugin
 __作用：__ 打包结束后，自动生成一个html文件，并把打包生成的js自动引入到html文件中
 - template参数：以哪个文件为模板生成html
 ### CleanWebpackPlugin
__作用：__ 自动清除原打包的文件夹，重新生成文件夹

## sourceMap
webpack打包后文件与源文件映射关系。当js中提示错误信息时，控制台显示源文件的错误，而不是webpack中的错误。
 - 为inline表示将source-map存放到打包好的js文件中。
 - cheap 错误提示只精确到行没精确到列，负责业务代码中错误，打包较快些。
 - source-map 表示打包完后生成.map.js
 - module 表示不仅会提示当前自己文档错误，也包括module中包含的错误。
 - eval 打包速度最快，依然可以生成映射
 __注意__:
mode:production,不需要source-map
但devtool即可:cheap-module-source-map
mode:development,cheap-module-eval-source-map

## webpackDevServer
### watch监控自动打包
package.json中添加{
    watch："webpack -watch"
}
### 启动Devserver
配置项中：
- contentBase:'./dist' 从哪个路径启动html
- open：启动后浏览器自动打开指定地址
- proxy：配置跨域接口模拟，访问指定地址时，代理到对应地址（vue和react脚手架均只用webpack） 

### 自己写类似于webpackserver的server
创建server.js,package.json的scripts添加node server.js
```
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const complier = webpack(config);（编译器）
/* 以上信息表示：
webpackDevMiddleware为中间件
 complier表示应用webpack命令以配置文件为主进行编译。
 此方法为在node中使用webpack命令
*/

const app=express();
app.use(webpackDevMiddleware(complier,{
    publicPath:config.output.publicPath
}))
/*
通过webpack和webpack配置生成编译器complier。启用中间件，中间件参数，一个是编译器，一个是编译完成后输出路径，与congfig中output的publicPath相对应*/

app.listen(8080,()=>{
    console.log('server is running!!');
});
/*通过express创建了http服务器，端口为8080。*/
```
参考内容：
命令行中如何使用webpack命令：Dobumentation->Api->Command Line Interface
node中使用webpack命令:Dobumentation->Api->Node Api
Dobumentation->Guides-development
Dobumentation->Configration-DevTool/DevServer
## Hot Module Replacement
表示doc只是修改部分发生变化，其他保持不变，提高性能。
package.json
```
devServer:{
    hot:true, // 开启热模块更新
    hotOnly:true // 停止浏览器自动刷新
}
```
参考内容：
Dobumentation->Guides-Hot Module Replacement
Dobumentation->Api-Hot Module Replacement
讲述module.hot
Documentation->Concepts->Hot Module Replacement
html底层webpack的实现原理

### babel
babel： 将babel和webpack通信成功
babel/core:  babel的核心代码库，识别js，转换成抽象语法树
babel/preset-env 将es6语法转为es5
babel/polyfill  补充对低版本的转换应用
package.json
```
{ 
    test: /\.js$/, 
    exclude: /node_modules/, 
    loader: "babel-loader",
    options:{
        presets:[["@babel/preset-env",{
            useBuiltIns:'usage',
            targets:{
                chrome:'67'
            }                 
        }]]
    } 
}
```
exclude:node_modules中js不打包
useBuiltIns:usage 根据业务代码进行polyfill补充
targets:{chrome:"67"}表示高于chrome67版本不需要补充，因         为浏览器本身已经支持es6

```
options:{
    // presets:[["@babel/preset-env",{
    //     useBuiltIns:'usage',
    //     targets:{
    //         chrome:'67'
    //     }                 
    // }]]
    "plugins": [["@babel/plugin-transform-runtime",{
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
    }]]
} 
```
当对业务代码打包时，应用源polyfill配置即可。但对类库进行打包时，要使用plugin-transform-runtime，避免polyfill污染全局环境。
__注意__ 当配置babel的options时，发现配置量巨大，可采用以下方法。

### react打包
.babelrc
```
{
    presets:[
        [
            "@babel/preset-env",{
            targets:{
                chrome:'67'
            },
            useBuiltIns:'usage'                
            }
        ],
        "@babel/preset-react"
    ]
}
// 执行顺序，从下往上
```
参考内容：
babel官网，docs->react

## Tree Shaking 
将模块中用到的代码打包，其他无用代码不打包。
只支持 ES Module。
__使用方法__ 在mode为development方式下，加入optimization
如果是production方式下，不需要加入optimization
同时修改package.json，增加sideEffects，该项表示哪些文件不需要做tree shaking。
### production和development
将公共部分拆分到webpack.common.js,采用webpack-merge进行合并。
### code spliting
以下为手动代码分割
```
    entry:{
        lodash:'./src/lodash.js',
        main:'./src/index.js',
    },
```
以下为自动代码分割,webpack.common.js配置同步加载模块打包
```
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    }
```
异步加载与自动分割无需任何配置，自动进行打包分割，只是用异步import形式加载时，应注意需要依赖babel，需要安装babel插件（babel-plugin-dynamic-import-webpack）,.babelrc添加配置
```
{"plugins": ["dynamic-import-webpack"]}
```
### splitChunksPlugin配置参数
目的：打包出来的第三方插件为原名而不是0.js,采用魔法注释Magic Comments，
```
    import(/* webpackChunkName:'lodash'*/'lodash').then(()=>{});
```
修改方式：删除babel-plugin-dynamic-import-webpack,安装官方@babel/plugin-syntax-dynamic-import，修改.babelrc中plugins，以及webpack.common.js中的配置
```
    optimization:{
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
                    priority: -10，
                    filename：'vendors.js'
                },
                default:{
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename:'common.js'
                }
            }
        }
    }
}
```
 - chunks: async只实现异步加载模块的代码分割,如果需要全部打包用“all”.同时修改cacheGroups中的配置."initial"同步代码分割
 - minSize:最小多大才进行代码分割。其他则根据cacheGroups中default配置进行打包
 - maxSize:会按要求进行二次拆分，一般不需配置
 - minChunks:被引用几次才会被分割
 - maxAsyncRequests:按需加载时最大并行请求数，如果代码分割超过5个，就不会再分割
 - maxInitialRequests:入口处的最大并行请求数，即首页进行加载的时候，最多分割出3个文件
 - automaticNameDelimiter:"~"分割打包后名字的默认连接符
 - cacheGroups:缓存组，用于配置打包规则。分vendors和default两部分，test表示在哪个文件夹下。priority为优先级，若两者都满足，看哪个优先级最高，filename则是打包出来后的文件名字。reuseExistingChunk表示如果打包过程中碰到已打包过的，则忽略，使用原打包好的模块即可。

 ### 打包分析，Preloading,Prefetching
 - 打包分析：对打包生成的文件分析。www.github.com/webpack/analyse,webpack分析的git库,在打包启动命令里添加 webpack --profile --json > stats.json --config ./build/webpack.dev.js 打包生成的stats文件可在以下地址中打开，并进行打包文件分析http://webpack.github.com/analyse。或者在webpack->guides->code Spliting->bundle analysis
 - 提高代码的使用率要比缓存来的更实际，使用率越高，性能越高。查看使用率，在控制台中ctrl+shift+p，输入show coverage。异步加载提高网站性能。
 - prefetch:主代码加载完，带宽释放出来后将其他页面加载上。preload与主代码一起加载。
 ```
 import(/*webpackprefetch:true */'./click.js').then(()=>{});
 ```
### CSS 打包
 - 补充知识点：output中添加chunkFilename表示间接引入的js的打包名称。
 - css打包：一般css直接打包到js中使用的插件MiniCssExtractPlugin,目前版本无论开发环境还是线上环境都可用。但注意tree Shaking配置可能会影响。因此，package.json中的sideEffects将css配置即可。
 - cssd代码压缩：添加插件optimize-css-assets-webpack-plugin，可根据入口进行压缩，具体参考官网。

 ### 浏览器缓存
 - 缓存机制：访问浏览器时加载了对应js文件。如果没有强制刷新，浏览器仍然访问的是原文件。只要名称发生变化，浏览器缓存则不起作用，可随时更新。启用contenthash占位符即可。在output文件名称中，添加contenthash，表示js文件名称根据每次hash值得来。如果业务代码有变化，则hash改变，无变化则不变。
 ```
     output:{
        filename:'[name].[contenthash].js',
        chunkFilename:'[name].[contenthash].js',
    }
 ```
 - webpack内置manifest逻辑（包括业务逻辑和chunks逻辑），可将其提炼到一个单独文件。
  ```
     optimization:{
         runtimeChunk:{
             name:'runtime'
         }
    }
 ```
 ### shimming 垫片，补充，设置全局变量。
 - webpack按照模块打包，每个模块内部自使用，之间不能共用。每个地方用到$的时候，都需要在最前面使用import引入。所以，可配置公共变量，即使用垫片。
 ```
 plugins:[
    new webpack.ProvidePlugin({
        $:'jquery',
        _join:['lodash','join']
    }),
 ],
 ```
 - 以上代表在模块中自动引入，等同于
 ```
 import $ from 'jquery';
 import _ from 'lodash';
 ```
- 以下为修改this指向，使用imports-loader
 ```
    { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use:[{
            loader: 'babel-loader', 
        },{
            loader:'imports-loader?this=>window'
        }]
    }
 ```
 修改模块中所有this指向，指向window
 - 参考文档
 documentation->guides阅读英文文档






### 以上信息来自 http://www.dell-lee.com/