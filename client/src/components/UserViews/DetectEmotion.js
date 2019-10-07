import React, { Component } from "react";
import Axios from "axios";
import DisplayPost from "./DisplayPost";
// import { Link } from "react-router-dom"
import ReactPlayer from "react-player";

export default class Post extends Component {
  state = {
    title: "",
    body: "",
    id: "",
    owner: "",
    ownerId: "",
    views: 0
  };

  componentDidMount = () => {
    this.getPostData();
  };

  newView = () => {
    // Axios.put("/u/api/view", { views: this.state.views + 1 }).then(response)
    this.setState({
      views: this.state.views + 1
    });
  };

  getPostData = () => {
    const { user, id } = this.props.match.params;
    Axios.get(`/u/api/${user}/${id}`).then(response => {
      console.log("NOW IS ITS YOUR TURN", response.data);
      const { title, body, views } = response.data;
      const owner = response.data.owner.username;
      const ownerId = response.data.owner._id;
      const id = response.data._id;
      this.setState({
        title,
        body,
        id,
        ownerId,
        owner,
        views
      });
    });
  };

  render() {
    return (
      <div>
        <DisplayPost newView={this.newView} {...this.state} />
        {/* Here To add the FaceDetection */}
        <ReactPlayer url={"https://www.youtube.com/watch?v=8kOiLadbzpM"} />
      </div>
    );
  }
}
