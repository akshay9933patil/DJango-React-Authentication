import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
        <ul className="ul">
            <li className="li"><NavLink to='#'>Home</NavLink></li>
            <li className="li"><NavLink to='login/'>Login</NavLink></li>
            <li className="li"><NavLink to='logout/'>Logout</NavLink></li>
            <li className="li"><NavLink to='add/student/'>Add Student</NavLink></li>
            <li className="li"><NavLink to='add/subject/'>Add Subject</NavLink></li>
        </ul>
    </div>
  )
}

export default Navbar