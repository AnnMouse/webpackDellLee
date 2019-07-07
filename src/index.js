// import './style.css';

// var btn =document.createElement('button');
// btn.innerHTML='new Create';
// document.body.appendChild(btn);
// btn.onclick=function(){
//     var dir=document.createElement('div');
//     dir.innerHTML="item";
//     document.body.appendChild(dir);
// }

import counter from './counter';
import number from './number';

counter();
number();

// module.hot监控module的变化
/*
  以下内容表示，其他一旦number发生变化，对于number
  文件来说，删掉原来的doc，重新执行一遍。实现热模块更新。
  但不建议如此操作。
  css-loader\vue-loader等已经内置了以下内容，无需重写
*/ 
if(module.hot){
    module.hot.accept('./number',()=>{
        document.body.removeChild(document.getElementById('number'));
        number();
    })
}