import React from 'react';
import {connect} from 'react-redux';
import LoginForm from './loginForm';
import {Redirect} from 'react-router-dom';
import RegistrationForm from './registerForm';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import AboutPage from './aboutPage';

export class LoginPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      display: 'about'
    };
  }
  showLogin(){
    this.setState({
      display: 'login'
    });
  }
  showRegister(){
    this.setState({
      display: 'register'
    });
  }
  showAbout(){
    this.setState({
      display: 'about'
    });
  }
  render(){
    if(this.props.loggedIn) {
      return <Redirect to="/dashboard"/>;
    }
    let component;
    if(this.props.loading===true){
      component = <h1 className="welcome-heading" >Please wait...</h1>;
      return(
        <div className="row">
          {component}
        </div>
      );
    }
    if(this.state.display === 'about'){
      component = <AboutPage/>;
      return(
        <div className="row">
          <h1 className="welcome-heading">Welcome to PowerGrade</h1>  
          <div className="row">
            <div className="col-2 container">
              {component}
              <button onClick={()=> this.showLogin()}className="aboutLogin">Login</button>
              <button onClick={() => this.showRegister()}className="aboutRegister">Sign Up</button>
            </div>
          </div>
        </div>
      );
    }
    if(this.state.display === 'login'){
      component = <LoginForm />;
      return(
        <div className="row">
          <h1 className="welcome-heading">Welcome to PowerGrade</h1>  
          <div className="row">
            <div className="col-3 login-form-container">
              {component}
              <p onClick={() => this.showRegister()}className="go-to-register">Sign up instead</p>
              <p onClick={() => this.showAbout()}className="go-to-about">Learn more</p>
            </div>
          </div>
        </div>
      );
    }
    if(this.state.display === 'register'){
      component =  <RegistrationForm />;
      return (
        <div className="row">
          <h1 className="welcome-heading">Welcome to PowerGrade</h1>  
          <div className="col-3 signup-form-container">
            {component}
            <p onClick={()=> this.showLogin()}className="go-to-login">Login instead</p>
            <p onClick={() => this.showAbout()}className="go-to-about">Learn more</p>
          </div>
        </div>
      );
    }
    return (
      <div></div>
    );
  }}

const mapStateToProps = state => ({
  loggedIn: state.loginReducer.currentUser !== null,
  loading: state.loginReducer.loading
});

export default connect(mapStateToProps)(LoginPage);