import React from 'react';
// import '../../styles/AboutPage.css';
import '../componentStyles.css';
import '../componentMobileStyles.css';
import '../componentTabletStyles.css';
import {Link} from 'react-router-dom';
export default class AboutPage extends React.Component {

  render(){ 
    return(
      <div className="container">
        <div className="about-info">
          <h1>Easy as 1, 2, 3 </h1>
          <p>
            <strong>Powergrade</strong> lets teachers throw away the gradebook and manage their 
            students' grades in one convenient space. It's simple!
          </p>
          <hr></hr>
          <div className="about-icon-container" >
            <div className="boxItem">
              <img src="./assets/calendarcolor.png" alt="calendar-color"/>
              <strong>Create a class</strong>
            </div>
            <div className="boxItem">
              <img src="./assets/foodcolor.png" alt="food-color" />
              <strong>Add assignments</strong>
            </div>
            <div className="boxItem">
              <img src="./assets/eventcolor.png" alt="event-color"/>
              <strong>Input grades</strong>
            </div>
          </div>
          <hr></hr>
          <div >
            <strong> Voila! Send your completed form to your friends via email directly from the website or share it via the generated link!</strong>
            <h3>   <Link to="/register"> Sign up </Link>to get started. </h3> 
          </div>   
        </div>
        <div className="bg"></div>
      </div>
    );
  }
}