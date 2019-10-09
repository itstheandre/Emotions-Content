import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/api";
import "../App.css";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const Navbar = props => {
  console.log("NAVBAR: ", props);
  return (
    <nav className='navbar navbar-expand-lg navbar-dark default-color'>
      <Link className='navbar-brand' to='/'>
        <img src='motus-logo2.png' style={{ height: "30px" }}></img>
      </Link>

      {props.user ? (
        <>
          <Link className='navbar-brand' to='/content-dashboard'>
            Content
          </Link>
          <Link className='navbar-brand' to={`/charts/${props.username}`}>
            Analytics
          </Link>
          <Link
            className='navbar-brand my-2 my-lg-0 ml-auto'
            to='/'
            onClick={() => handleLogout(props)}
          >
            Logout
          </Link>{" "}
        </>
      ) : (
        <>
          <Link className='navbar-brand my-2 my-lg-0 ml-auto' to='/signup'>
            Signup
          </Link>
          <Link className='navbar-brand my-2 my-lg-0 ml-auto' to='/login'>
            Login
          </Link>
        </>
      )}
      {props.user && (
        <h3 className='heyUser my-2 my-lg-0 ml-auto'>
          Hey {props.user.fullName}
        </h3>
      )}
    </nav>
  );
};

export default Navbar;
