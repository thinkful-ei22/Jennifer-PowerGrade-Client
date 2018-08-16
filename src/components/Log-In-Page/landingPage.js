import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './loginForm';
import {Redirect} from 'react-router-dom';
import RegistrationForm from './registerForm';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';

class LoginPage extends React.Component{
  render(){
    if(this.props.loggedIn) {
      return <Redirect to="/dashboard"/>;
    }
    return (
      <div>
        <div className="row">
          <h1 className="welcome-heading">Welcome to PowerGrade</h1>
        </div>
        <div className="row">
          <div className="col-4 login-form-container">
            <h3 className="login-heading">Log-In</h3>
            <LoginForm />
          </div>
          <div className="col-4 signup-form-container">
            <h3 className="signup-heading">Sign-Up</h3>
            <RegistrationForm />
          </div>
        </div>
      </div>
    );
  }}

const mapStateToProps = state => ({
  loggedIn: state.loginReducer.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);