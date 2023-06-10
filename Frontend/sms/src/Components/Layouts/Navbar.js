import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
        <ul className="ul">
            <li className="li"><NavLink to='#'>Home</NavLink></li>
            <li className="li"><NavLink to='login/'>Login</NavLink></li>
            <li className="li"><NavLink to='#'>Logout</NavLink></li>
        </ul>
    </div>
  )
}

export default Navbar