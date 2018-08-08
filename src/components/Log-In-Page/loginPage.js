import React from 'react';
import {connect} from 'react-redux';
import './styles/loginPage.css';

class Login extends React.Component {
//   componentDidMount(){
//     this.props.dispatch(fetchAssignments());
//   }
  render(){
    return (
      <div>
        <div className="row">
          <h1 className="heading">Welcome to PowerGrade</h1>
        </div>
        <div className="row">
          <div className="col-4 signup form-container">
            <h3 className="heading">Sign-Up</h3>
            <form>
              <div> 
                <label>First Name</label>
                <input type="text" value id="su-first-name"></input>
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" value id="su-last-name"></input>
              </div> 
              <div>
                <label>Username</label>
                <input type="text" value id="su-username"></input>
              </div>
              <div>
                <label>Password</label>
                <input type="text" value id="su-password"></input>
              </div>
              <div>
                <label>Confirm Password</label>
                <input type="text" value id="su-password-confirm"></input>
              </div>
              <div className="button-container">
                <button>Sign-Up</button>
              </div>
            </form>
          </div>
          <div className="col-4 login form form-container">
            <h3 className="heading">Log-In</h3>
            <form>
              <div>
                <label>Username</label>
                <input type="text" value id="li-username"></input>
              </div>
              <div>
                <label>Password</label>
                <input type="text" value id="li-password"></input>
              </div>
              <div className="button-container">
                <button>Log-In</button>
              </div>
            </form>
          </div> 
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
  };
};

export default connect(mapStateToProps)(Login);