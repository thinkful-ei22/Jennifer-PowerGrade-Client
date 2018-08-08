import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './loginForm';
import {Redirect} from 'react-router-dom';
import RegistrationForm from './registerForm';

export function LoginPage(props){
  if(props.loggedIn) {
    return <Redirect to="/home" />;
  }
  return (
    <div>
      <div className="row">
        <h1 className="heading">Welcome to PowerGrade</h1>
      </div>
      <div className="row">
        <div className="col-4 login form form-container">
          <h3 className="heading">Log-In</h3>
          <LoginForm />
        </div>
        <div className="col-4 signup form-container">
          <h3 className="heading">Sign-Up</h3>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  logginIn: state.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);