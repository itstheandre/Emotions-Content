import React, { Component } from "react";
import Axios from "axios";
import DisplayPost from "./DisplayPost";
// import { Link } from "react-router-dom";

export default class Post extends Component {
  state = {
    title: "",
    body: "",
    id: "",
    owner: "",
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
      const { title, body, views } = response.data;
      const owner = response.data.owner.username;
      const id = response.data.owner._id;
      this.setState({
        title,
        body,
        id,
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
      </div>
    );
  }
}
