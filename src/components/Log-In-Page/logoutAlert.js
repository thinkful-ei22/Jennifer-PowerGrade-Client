import React from 'react';
import {connect} from 'react-redux';
import {authSetWarning} from '../../actions/AUTH/loginAction';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';

export class LogoutAlert extends React.Component {
  
  render() {
    return (
      <div className="warning-box" style={{'display':(this.props.warning)?'block':'none'}}>
        <p className="warning-text">You are about to be logged out due to inactivity.</p>
        <button className="stay-logged-in" onClick={()=>this.props.dispatch(authSetWarning(false))}>Click here to remain logged in!</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    warning: state.loginReducer.warning
  };
};
export default connect(mapStateToProps)(LogoutAlert);