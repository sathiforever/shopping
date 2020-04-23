import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HeaderMenu from './components/headerMenu'
//import Fooder from './components/fooder'
import Home from './components/Home'
import Cart from './components/Cart'

class App extends Component {
  render() {
    return (
       <BrowserRouter>
            <div className="App">
              <div className="container">
                  <HeaderMenu />
                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/cart/" component={Cart}/>
                    </Switch>
                </div>
                {/* <Fooder />  */}
             </div>
       </BrowserRouter>
      
    );
  }
}

export default App;
