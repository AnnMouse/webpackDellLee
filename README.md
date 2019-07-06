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
## loader中file-loader执行过程
 - 将图片拷贝到dist目录下，将生成的地址返回给变量
 - 可配置参数：输出名称、输出地址
## loader中url-loader
 - 与file-loader类似，将图片转化为base64，可设置limit属性，超过设置值则与file-loader一样拷贝图片