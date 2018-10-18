import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import { ftruncate } from 'fs';

export class GettingStarted extends React.Component {
  constructor(props){
    super(props);
    this.state={
      gradebook:false,
      createClass:false,
      editClass: false,
      createAssignment:false,
      editAssignment: false
    };
  }
  toggleGBLesson(){
    this.setState({
      gradebook:!this.state.gradebook,
      createClass:false,
      editClass: false,
      createAssignment:false,
      editAssignment: false
    });
  }
  toggleCCLesson(){
    this.setState({
      gradebook:false,
      createClass:!this.state.createClass,
      editClass: false,
      createAssignment:false,
      editAssignment: false
    });
  }
  toggleECLesson(){
    this.setState({
      gradebook:false,
      createClass:false,
      editClass: !this.state.editClass,
      createAssignment:false,
      editAssignment: false
    });
  }
  toggleCALesson(){
    this.setState({
      gradebook:false,
      createClass:false,
      editClass: false,
      createAssignment:!this.state.createAssignment,
      editAssignment: false
    });
  }
  toggleEALesson(){
    this.setState({
      gradebook:false,
      createClass:false,
      editClass: false,
      createAssignment:false,
      editAssignment: !this.state.editAssignment
    });
  }
  render(){
    let gblesson;
    if(this.state.gradebook){
      gblesson =  <ol className="lesson-steps">
        <li>Click on "Setup Gradebook"</li>
        <li>Enter the percentage weights for each assignment category</li>
        <li>Click "Save".  Your student averages will now be calculated using this weights.</li>
      </ol>;
    }
    let cclesson;
    if(this.state.createClass){
      cclesson =   <ol className="lesson-steps">
        <li>Click on "Create Class"</li>
        <li>Fill out the "Create Class" form.</li>
        <li>Click "Save".</li>
        <li>Click the "x" to close the form.</li>
      </ol>;
    }
    let eclesson;
    if(this.state.editClass){
      eclesson = <ol className="lesson-steps">
        <li>Click on "View Classes"</li>
        <li>Click the name of the class you wish to edit.</li>
        <li>Complete the form and click "Save".</li>
        <li>Click the "x" to close the form.</li>
      </ol>;
    }
    let calesson;
    if(this.state.createAssignment){
      calesson =  <ol className="lesson-steps">
        <li>Click on "Assignments" on the navigation bar.</li>
        <li>Fill out the "Create Assignment" form.</li>
        <li>Click "Save".</li>
      </ol>;
    }
    let ealesson;
    if(this.state.editAssignment){
      ealesson = <ol className="lesson-steps">
        <li>Click on "Assignments" on the navigation bar.</li>
        <li>Click the name of the assignment that you wish to edit.</li>
        <li>Complete the form and click "Save".</li>
        <li>Click the "x" to close the form.</li>
      </ol>;
    }
    return (
      <div className="getting-started">
        <h1 className="get-started-heading">Getting Started</h1>
        <h3 className="get-started-heading">Click on a topic to learn more.</h3>
        <div className="lesson">
          <h4 className="lesson-title" onClick={()=>this.toggleGBLesson()} name={'gradebook'}>Setting up your gradebook</h4>
          {gblesson}
        </div>
        <div className="lesson">
          <h4 className="lesson-title" onClick={()=>this.toggleCCLesson()} name="createClass">Creating a class</h4>
          {cclesson}
        </div>
        <div className="lesson">
          <h4 className="lesson-title" onClick={()=>this.toggleECLesson()} name='editClass'>Editing a class</h4>
          {eclesson}
        </div>
        <div className="lesson">
          <h4 className="lesson-title" onClick={()=>this.toggleCALesson()} name='createAssignment'>Creating an assignment</h4>
          {calesson}
        </div>
        <div className="lesson">
          <h4 className="lesson-title" onClick={()=>this.toggleEALesson()} value='editAssignment'>Editing an assignment</h4>
          {ealesson}
        </div>
      </div>
    );
  }
}

  
export default requiresLogin()(connect()(GettingStarted));