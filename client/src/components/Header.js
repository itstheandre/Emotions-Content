import React from "react";
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
//   MDBLabel
// } from "mdbreact";
import "../App.css";

const Header = () => {
  return (
    <>
      {/* <h1 className=" text-center logIn"> Welcome to </h1> */}
      <img className="motusHeader logIn" src="motus-header.png" />

      <iframe
        style={{ pointerEvents: "none" }}
        src="https://giphy.com/embed/KD1vTHZYe5l8TcPZHo"
        width="480"
        height="300"
        frameBorder="0"
        className=" motusHeader giphy-embed"
        allowFullScreen
      ></iframe>
      <p style={{ fontSize: "2rem" }} className="motusHeader">
        the app that makes analitics of a content in terms of user's emotions,
        age, gender and time spent on a page
      </p>
    </>
  );
};
export default Header;
