import React from 'react';
// import '../../styles/AboutPage.css';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
export default class AboutPage extends React.Component {

  render(){
    return(
      <div>
        <div className="about-info">
          <h1 className="info-heading">Easy as 1, 2, 3 </h1>
          <p>
            <strong>Powergrade</strong> lets teachers throw away the gradebook and manage their 
            students' grades in one convenient space. It's simple!
          </p>
          <div className="about-icon-container" >
            <div className="boxItem">
              <img src="https://github.com/thinkful-ei22/Jennifer-PowerGrade-Client/blob/master/Screenshots/class.png?raw=true" alt="class"/>
              <strong>Create a class</strong>
            </div>
            <div className="boxItem">
              <img src="https://github.com/thinkful-ei22/Jennifer-PowerGrade-Client/blob/master/Screenshots/assignment.png?raw=true" alt="assignment" />
              <strong>Add assignments</strong>
            </div>
            <div className="boxItem">
              <img src="https://github.com/thinkful-ei22/Jennifer-PowerGrade-Client/blob/master/Screenshots/grade.png?raw=true" alt="grade"/>
              <strong>Input grades</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}