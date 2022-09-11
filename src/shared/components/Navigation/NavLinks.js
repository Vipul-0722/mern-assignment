import React, { useContext } from 'react';
import { NavLink ,useHistory} from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';


const NavLinks = props => {
  const auth = useContext(AuthContext);
    const history=useHistory();
  const handleLogout=()=>{
        auth.logout();
        history('/auth')
}

  return (
    <ul className="nav-links">
      {/* <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li> */}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/teacher`}>MY FAVROUTE TEACHER</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/teacher/new">ADD TEACHER</NavLink>
        </li>
      )}
      {/* {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">SIGNIN/SIGNUP</NavLink>
        </li>
      )} */}
      {auth.isLoggedIn && (
        <li>
          <button onClick={handleLogout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
