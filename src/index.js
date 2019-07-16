import React,{ Component } from 'react';
import { BrowserRouter,Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Home from './Home.js';
import List from './List.js';

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' component={Home}/>
                    <Route path='/list' component={List}/>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDom.render(<App />,document.getElementById('root'));