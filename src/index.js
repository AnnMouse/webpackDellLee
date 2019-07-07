import "@babel/polyfill";
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
// const arr = [
//     new Promise(()=>{}),
//     new Promise(()=>{})
// ];

// arr.map(item=>{
//     console.log(item);
// })

class App extends Component {
    render(){
        return <div>Hello World</div>
    }
}

ReactDOM.render(<App />,document.getElementById('root'));
