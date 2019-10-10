import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBLabel
} from "mdbreact";

export default class ContentDashCard extends Component {
  state = {
    textToCopy: "",
    message: ""
  };

  anotherPage = () => {
    navigator.clipboard.writeText(this.state.textToCopy);
    this.setState({ message: "Your link has been added to the clipboad" });
    this.timeOut();
  };

  timeOut = () => {
    setTimeout(() => {
      this.setState({ message: "" });
    }, 1000);
  };

  componentDidMount = () => {
    const id = this.props.content._id;
    const user = this.props.user.username;
    this.setState({
      textToCopy: `https://motus-app.herokuapp.com/u/${user}/${id}`
    });
  };

  handleClick = event => {
    event.preventDefault();
    return Axios.delete(`/api/content/${this.props.content._id}`).then(
      response => {
        // console.log(response.data);
        this.props.getData();
      }
    );
  };
  render() {
    return (
      <div className='borderCard'>
        <div className='contentCard'>
          <h2>{this.props.content.title}</h2>
          <h4>{this.props.content.date}</h4>
          <h3>{this.props.content.contentType}</h3>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/content-dashboard/${this.props.content._id}`}
          >
            <i className='fas fa-lg fa-eye'></i>
          </Link>
          {/* EDIT */}
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/edit/${this.props.content._id}`}
          >
            <i className='fas fa-lg fa-edit'></i>
          </Link>
          {/* DELETE */}
          <i
            className='fas fa-lg fa-trash-alt'
            onClick={this.handleClick}
            style={{ cursor: "pointer" }}
          ></i>
          {/* SHARE */}
          <i
            className='far fa-lg fa-share-square'
            onClick={this.anotherPage}
            style={{ cursor: "pointer" }}
          ></i>
          <p style={{ textAlign: "center" }}>{this.state.message}</p>
          <Link to={`/u/${this.props.user.username}/${this.props.content._id}`}>
            {" "}
            View as Normal
          </Link>
        </div>
        <hr width='80%' />
      </div>
    );
  }
}
