import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar(props){
  return (
    <nav className="topnav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/grades">Grades</Link>
        </li>
        <li>
          <Link to="/assignments">Assignments</Link>
        </li>
        <li className="icon"><i className="fa fa-bars expandnav"></i></li>
      </ul>
    </nav>
  );
}
