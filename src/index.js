// 同步加载
// import _ from 'lodash';

// var element =  document.createElement('div');;
// element.innerHTML=_.join(['Dell','Lee'],'-');
// document.body.appendChild(element);


// 异步加载
// function getComponent(){
//     return import(/* webpackChunkName:'lodash'*/'lodash').then(({default : _ }) => {
//         var element = document.createElement('div');
//         element.innerHTML=_join(['Dell','Lee'],'-');
//         return element;
//     })
// }

// getComponent().then((element)=>{
//     document.body.appendChild(element);
// })