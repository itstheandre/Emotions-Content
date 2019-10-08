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
      <Link to='/'>Motus </Link>
      {props.user ? (
        <>
          <Link to='/content-dashboard'>Content</Link>
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
      {props.user && <h3>Hey {props.user.fullName}</h3>}
    </nav>
  );
};

export default Navbar;
