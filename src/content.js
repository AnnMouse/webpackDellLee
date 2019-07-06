function Content(){
    var doc=document.getElementById('root');
    var content=document.createElement('div');
    content.innerText='content';
    doc.append(content);
}

export default Content;

// CommonJS 模式
// module.exports=Content;