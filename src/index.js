import './style.css';

var btn =document.createElement('button');
btn.innerHTML='new Create';
document.body.appendChild(btn);
btn.onclick=function(){
    var dir=document.createElement('div');
    dir.innerHTML="item";
    document.body.appendChild(dir);
}
