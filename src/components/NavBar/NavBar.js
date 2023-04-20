import React, { useState } from 'react';
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../slices/users";

function NavBar() {
  //state
  let [ userName, setUserName ] = useState("John");

  //dispatch
  let dispatch = useDispatch();

  //redux state
  let users = useSelector(state => state.users);

  //onLoginClick: Executes when the user clicks on Login button
  let onLoginClick = () => {
    dispatch( login(userName) );
  };

  //onLogoutClick: Executes when the user clicks on Logout button
  let onLogoutClick = () => {
    dispatch( logout() );
  };

  return (
    <div className="nav">

      {!users.isLoggedIn? <div>
        {/* if the user is NOT logged in */}
        <input type="text" placeholder="Username" value={userName} onChange={(event) => { setUserName(event.target.value); }} className="form-control" />

      <button className="button button-blue" onClick={onLoginClick}>Login</button>
      </div>: 
      
      
      <div>
        {/* if the user is logged in */}
        <i className="fas fa-user"></i>&nbsp;
        <span>{users.currentUser}</span>
        <button className="button button-red" onClick={onLogoutClick}>Logout</button>
      </div>}

      
    </div>
  )
}

export default NavBar;
