import React from 'react';
import {connect} from 'react-redux';
// import './styles/loginPage.css';

class Dashboard extends React.Component {
//   componentDidMount(){
//     this.props.dispatch(fetchAssignments());
//   }
  render(){
    return (
      <div>
        <div className="row">
          <nav className="topnav">
            <ul>
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">Grades</a></li>
              <li><a href="#">Assignments</a></li>
              <li><a href="#">Performance</a></li>
              <li className="icon"><a href="#"><i className="fa fa-bars expandnav"></i></a></li>
            </ul>
          </nav>
        </div>
        <div className="row">
          <h1 className="welcome">Welcome to PowerGrade, Jennifer!</h1>
        </div>
        <div className="row">
          <div className="col-3 option get-started">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action" >Get Started</h2>
          </div>
          <div className="col-3 option create-class">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action" >Create Class</h2>
          </div>
          <div className="col-3 option set-up">
            <div className="go"><a><i className="fa fa-plus"></i></a></div>
            <h2 className="action" >Setup Gradebook</h2>
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

export default connect(mapStateToProps)(Dashboard);