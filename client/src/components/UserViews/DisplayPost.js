import React, { Component } from "react";
import { Link } from "react-router-dom";
import FaceApi from "../face-api/FaceApi";

export default class DisplayPost extends Component {
  componentDidMount = () => {
    this.props.newView();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Link to={`/u/${this.props.owner}`}>Check the creator's page</Link>
        <h1>{this.props.title}</h1>
        <h3>{this.props.owner}</h3>
        {this.props.body}
<<<<<<< HEAD
        <FaceApi />
=======
        <FaceApi id={this.props.id}/>
>>>>>>> e33c13a07a43f1a1fe7b5240eb56d397b81e560e
      </div>
    );
  }
}
