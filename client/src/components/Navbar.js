import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/api";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const Navbar = props => {
  return (
    <nav>
      {props.user && <h1>Hey {props.user.username}</h1>}
      <Link to='/'>Home</Link>
      {props.user ? (
        <>
          <Link to='/content'>Content</Link>
          <Link to='/' onClick={() => handleLogout(props)}>
            Logout
          </Link>{" "}
        </>
      ) : (
        <>
          <Link to='/signup'>Signup</Link>
          <Link to='/login'>Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
