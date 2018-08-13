import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import LogoutAlert from './components/Log-In-Page/logoutAlert';
import LandingPage from './components/Log-In-Page/landingPage';
import Dashboard from './components/Dashboard-Page/dashboard';
import AssignmentsPage from './components/Assignments-Page/assignmentsPage';
import GradesPage from './components/Grades-Page/gradesPage';
import {refreshAuthToken, clearAuth, authSetWarning} from './actions/AUTH/loginAction';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
    if(this.props.loggedIn && !this.alertIdleTimer){
      this.refreshActivity();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // 1 hour
    );
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
  }
  refreshActivity(){
    if(this.alertIdleTimer) window.clearTimeout(this.alertIdleTimer);
    if(this.props.loggedIn){
      this.alertIdleTimer = setTimeout(
        () => this.props.dispatch(authSetWarning(true)),
        60 * 1000 * 55 //55 minutes
      );
    } 
    if(this.activityTimer) window.clearTimeout(this.activityTimer);
    this.activityTimer = setTimeout(
      () => this.props.dispatch(clearAuth()),
      60 * 1000 * 60); // 1 hour
  }
  render() {
    return (
      <div onClick={()=>this.refreshActivity()}>
        <LogoutAlert/>
        <Route path="/" exact component={LandingPage}/>
        <Route path="/dashboard" exact component={Dashboard}/>
        <Route path="/assignments" exact component={AssignmentsPage}/>
        <Route path="/grades" exact component={GradesPage}/>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  hasAuthToken: state.loginReducer.authToken !== null,
  loggedIn: state.loginReducer.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(App));
