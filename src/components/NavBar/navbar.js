import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../../actions/AUTH/loginAction';
import requiresLogin from '../requiresLogin';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';

class NavBar extends React.Component{
  render(){
    return (
      <nav className="topnav">
        <ul className="topnav-link-list">
          <li className="topnav-link">
            <Link to="/">Home</Link>
          </li>
          <li className="topnav-link">
            <Link to="/grades">Grades</Link>
          </li>
          <li className="topnav-link">
            <Link to="/assignments">Assignments</Link>
          </li>
          <li className="topnav-link-logout">
            <Link onClick={()=>this.props.dispatch(clearAuth())}to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state =>{
  return {
    currentUser: state.loginReducer.currentUser
  };
};
export default requiresLogin()(connect(mapStateToProps)(NavBar));


