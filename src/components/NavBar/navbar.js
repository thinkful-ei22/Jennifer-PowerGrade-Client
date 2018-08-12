import React from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

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
        <li className="icon"><i className="fa fa-bars expandnav"></i></li>
      </ul>
    </nav>
  );
}
