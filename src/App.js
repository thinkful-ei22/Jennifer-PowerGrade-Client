import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// import './App.css';
import LandingPage from './components/Log-In-Page/landingPage';
import Dashboard from './components/Dashboard-Page/dashboard';
import AssignmentsPage from './components/Assignments-Page/assignmentsPage';
import GradesPage from './components/Grades-Page/gradesPage';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/assignments" exact component={AssignmentsPage}/>
        <Route path="/grades" exact component={GradesPage}/>
      </div>
    );
  }
}

export default App;
