function counter(){
    var btn =document.createElement('div');
    btn.setAttribute('id','counter')
    btn.innerHTML=1;
    btn.onclick=function(){
        btn.innerHTML = parseInt(btn.innerHTML,10)+1
    }
    document.body.appendChild(btn);
}

export default counter;