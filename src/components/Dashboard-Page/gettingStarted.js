import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from '../requiresLogin';
import '../componentStyles.css';

class GettingStarted extends React.Component {
  
  state = {
    big: 'Select a Lesson'
  }


  makeBig(e){
    e.preventDefault();
    // if(e.currentTarget.className='thumbnail setup-gradebook-link'){

    // }
    // else if(e.currentTarget.className=)
    //  this.setState({
    //    big: e.currentTarget.nextSibling.children
    //  })
    // console.log(e.currentTarget.nextSibling.children);
  }

  render(){
    return (
      <div className="getting-started-carousel">
        <h1>Getting Started</h1>
        <div className="current-lesson-container">
          <div>{`${this.state.big}`}</div>
        </div>
        <div className="other-lesson-thumbnails">
          <a onClick={e=> { this.makeBig(e);}} className="thumbnail setup-gradebook-link" role="button">
            <p>Set up your gradebook...</p>
          </a>
          <div>
            <h4>Set up you gradebook</h4>
            <ol>
              <li>Click on "Setup Gradebook"</li>
              <li>Enter the percentage weights for each assignment category</li>
              <li>Click "Save".  Your student averages will now be calculated using this weights.</li>
            </ol>
          </div>
          <a onClick={e=> { this.makeBig(e);}} className="thumbnail create-class-link" role="button">
            <p>Create a class...</p>
          </a>
          <div>
            <h4>Create a class</h4>
            <ol>
              <li>Click on "Create Class"</li>
              <li>Fill out the "Create Class" form.</li>
              <li>Click "Save".</li>
              <li>Click the "x" to close the form.</li>
            </ol>
          </div>
          <a onClick={e=> { this.makeBig(e);}} className="thumbnail edit-class-link" role="button">
            <p>Edit a class...</p>
          </a>
          <div>
            <h4>Edit a class</h4>
            <ol>
              <li>Click on "View Classes"</li>
              <li>Click the name of the class you wish to edit.</li>
              <li>Complete the form and click "Save".</li>
              <li>Click the "x" to close the form.</li>
            </ol>
          </div>
          <a onClick={e=> { this.makeBig(e);}} className="thumbnail create-assignment-link" role="button">
            <p>Create an assignment...</p>
          </a>
          <div>
            <h4>Create an assignment</h4>
            <ol>
              <li>Click on "Assignments" on the navigation bar.</li>
              <li>Fill out the "Create Assignment" form.</li>
              <li>Click "Save".</li>
            </ol>
          </div>
          <a onClick={e=> { this.makeBig(e);}} className="thumbnail edit-assignment-link" role="button">
            <p>Edit an assignment...</p>
          </a>
          <div>
            <h4>Edit an assignmnet</h4>
            <ol>
              <li>Click on "Assignments" on the navigation bar.</li>
              <li>Click the name of the assignment that you wish to edit.</li>
              <li>Complete the form and click "Save".</li>
              <li>Click the "x" to close the form.</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

  
export default requiresLogin()(connect()(GettingStarted));