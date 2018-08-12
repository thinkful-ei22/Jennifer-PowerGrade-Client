import React from 'react';
import {Link} from 'react-router-dom';
import '../componentStyles.css';
import '../componentMobileStyles.css';

export default function NavBar(props){
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
      </ul>
    </nav>
  );
}
