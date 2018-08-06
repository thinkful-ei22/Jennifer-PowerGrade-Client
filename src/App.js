import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Login from './components/loginPage';
import Dashboard from './components/dashboard';
import Test from './components/test'

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Login}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/test" exact component={Test}/>
      </div>
    );
  }
}

export default App;
