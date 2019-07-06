function Header(){
    var doc=document.getElementById('root');
    var header=document.createElement('div');
    header.innerText='header';
    doc.append(header);
}

export default Header;

// CommonJS 模式
// module.exports=Header;