import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import '../componentStyles.css';

class GettingStarted extends React.Component {

  render(){
    return (
      <div className="getting-started">
        <h1 className="get-started-heading">Getting Started</h1>
        <div className="lesson">
          <h4 className="lesson-title">Set up your gradebook</h4>
          <ol className="lesson-steps">
            <li>Click on "Setup Gradebook"</li>
            <li>Enter the percentage weights for each assignment category</li>
            <li>Click "Save".  Your student averages will now be calculated using this weights.</li>
          </ol>
        </div>
        <div className="lesson">
          <h4 className="lesson-title">Create a class...</h4>
          <ol className="lesson-steps">
            <li>Click on "Create Class"</li>
            <li>Fill out the "Create Class" form.</li>
            <li>Click "Save".</li>
            <li>Click the "x" to close the form.</li>
          </ol>
        </div>
        <div className="lesson">
          <h4 className="lesson-title">Edit a class...</h4>
          <ol className="lesson-steps">
            <li>Click on "View Classes"</li>
            <li>Click the name of the class you wish to edit.</li>
            <li>Complete the form and click "Save".</li>
            <li>Click the "x" to close the form.</li>
          </ol>
        </div>
        <div className="lesson">
          <h4 className="lesson-title">Create an assignment...</h4>
          <ol className="lesson-steps">
            <li>Click on "Assignments" on the navigation bar.</li>
            <li>Fill out the "Create Assignment" form.</li>
            <li>Click "Save".</li>
          </ol>
        </div>
        <div className="lesson">
          <h4 className="lesson-title">Edit an assignment...</h4>
          <ol className="lesson-steps">
            <li>Click on "Assignments" on the navigation bar.</li>
            <li>Click the name of the assignment that you wish to edit.</li>
            <li>Complete the form and click "Save".</li>
            <li>Click the "x" to close the form.</li>
          </ol>
        </div>
      </div>
    );
  }
}

  
export default requiresLogin()(connect()(GettingStarted));