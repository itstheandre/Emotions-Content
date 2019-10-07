import React, { Component } from "react";
import { Link } from "react-router-dom";
import FaceApi from "../face-api/FaceApi";
import ReactPlayer from "react-player";

export default class DisplayPost extends Component {
  // componentDidMount = () => {
  //   this.props.newView();
  // };

  render() {
    // console.log("LOOK HERE NOW MOFO", this.props);
    return (
      <div>
        <ReactPlayer url={"https://www.youtube.com/watch?v=8kOiLadbzpM"} />
        <br />
        HERE {this.props.views} views
        <br />
        <Link to={`/u/${this.props.owner}`}>Check the creator's page</Link>
        <h1>{this.props.title}</h1>
        <h3>{this.props.owner}</h3>
        {this.props.body}
        <FaceApi id={this.props.id} />
      </div>
    );
  }
}
