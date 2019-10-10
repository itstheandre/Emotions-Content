import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/api";
import logo from "../motus-logo2.png";
import "../App.css";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const Navbar = props => {
  return (
    <nav className=' sticky-top navbar navbar-expand-lg navbar-dark default-color'>
      <Link className='navbar-brand' to='/'>
        <img src={logo} style={{ height: "30px" }}></img>
      </Link>

      {props.user ? (
        <>
          <Link className='navbar-brand' to='/content-dashboard'>
            Content
          </Link>
          <Link className='navbar-brand' to={`/chart`}>
            Analytics
          </Link>
          <Link
            className='navbar-brand my-2 my-lg-0 ml-auto'
            to='/'
            onClick={() => handleLogout(props)}
          >
            <i className='fas fa-sign-out-alt'></i>
          </Link>{" "}
        </>
      ) : (
        <>
          <Link className='navbar-brand my-2 my-lg-0 ml-auto' to='/signup'>
            Signup
          </Link>
          <Link className='navbar-brand my-2 my-lg-0 ml-auto' to='/login'>
            <i className='fas fa-sign-in-alt'></i>
          </Link>
        </>
      )}
      {props.user && (
        <h3 className='heyUser my-2 my-lg-0 ml-auto'>
          Hey {props.user.fullName}
        </h3>
      )}
      {props.user && (
        <Link style={{ marginTop: "5px" }} to='/settings'>
          <i className='fas fa-user-edit white-text'></i>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
