// ES module 模式
// webpack模块打包工具
// ADM
// CMD
// 其余可根据官方文档确定如何加载导入模块
import Header from './header';
import Content from './content';
import Sidebar from './sidebar';
// CommonJS 模式
// var Header = require('./header.js');
// var Content = require('./content.js');
// var Sidebar = require('./sidebar.js');


new Header();
new Content();
new Sidebar();