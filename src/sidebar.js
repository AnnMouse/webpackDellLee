function Sidebar(){
    var doc=document.getElementById('root');
    var sidebar=document.createElement('div');
    sidebar.innerText='header';
    doc.append(sidebar);
}

export default Sidebar;

// CommonJS 模式
// module.exports=Sidebar;