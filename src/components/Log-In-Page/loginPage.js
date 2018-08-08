import React from 'react';
import {connect} from 'react-redux';
import {LoginForm} from './loginForm';
import {RegisterForm} from './registerForm';
import './styles/loginPage.css';

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
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  logginIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);