import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../../requiresLogin';
import {fetchAssignments, fetchOneAssignment} from '../../../actions/GET/fetchAssignments';
import {deleteAssignment} from '../../../actions/DELETE/deleteAssignment';
import '../../componentStyles.css';
import '../../componentTabletStyles.css';
import '../../componentMobileStyles.css';

export class AssignmentDisplay extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchAssignments());
  }
  activateAssignmentEditPopup(e){
    const popup = e.target.parentElement.parentElement.parentElement.parentElement.nextSibling;
    if(popup.className === 'assignment-edit-hidden col-3'){
      return popup.className = 'assignment-edit-active col-3';
    }
    return;
  }
  generateAssignmentList(){
    return this.props.assignments.filter(assignment=>assignment.userId===this.props.currentUser._id);
  }
  render(){
    let assignmentList;
    if(this.props.loading === false){
      assignmentList=this.generateAssignmentList().map((assignment) =>(
        <div className="assignment-list" key={assignment.id}>
          <li 
            onClick={(e)=>{
              this.activateAssignmentEditPopup(e);
              this.props.dispatch(fetchOneAssignment(e.target.id));
            }} 
            className="assignment-list-item" 
            id={assignment._id}>
            {assignment.name}
          </li>
          <i id={assignment._id} className="delete-assignment-x fa fa-times" onClick={(e) => {
            this.props.dispatch(deleteAssignment(e.target.id));
            this.props.dispatch(fetchAssignments());
          }}></i>     
        </div>));
    }
    if(this.props.loading === true){
      assignmentList = <li className="assignment-list-item" >Loading...</li>;
    } 
    return (
      <div>
        <h4 className="lesson-title">Click an assignment to edit.</h4>
        <ul className="assignment-list-ul">
          {assignmentList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assignments: state.assignmentCRUDReducer.filteredAssignments,
    currentAssignment: state.assignmentCRUDReducer.currentAssignment,
    currentUser: state.loginReducer.currentUser,
    loading: state.assignmentCRUDReducer.loading
  };
};

export default requiresLogin()(connect(mapStateToProps)(AssignmentDisplay));