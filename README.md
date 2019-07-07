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