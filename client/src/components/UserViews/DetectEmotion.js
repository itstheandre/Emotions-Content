import React, { Component } from "react";
import axios from "axios";
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

  // newView = () => {
  //   console.log("TRYING TO ADD 1 VIEW", this.state.views);
  //   // axios.put("/u/api/view", { views: this.state.views + 1 }).then(response)
  //   this.setState({
  //     views: this.state.views + 1
  //   });
  //   console.log("AFTER ADDING 1 VIEW", this.state.views);
  // };

  getPostData = () => {
    const { user, id } = this.props.match.params;
    axios.get(`/u/api/${user}/${id}`).then(response => {
      console.log("Get request", response.data);
      // const { title, body } = response.data;
      const views = response.data.views + 1;

      console.log(views);

      // const owner = response.data.owner.username;
      // const ownerId = response.data.owner._id;
      const newId = response.data._id;

      axios.put(`/u/api/views/${newId}`, { views }).then(response => {
        console.log("PUT REQUEST NOW", response.data.views);
        this.setState({
          views: response.data.views
        });
      });

      // this.setState({
      //   views
      // });
    });
  };

  render() {
    console.log("VIEWS: ", this.state.views);
    return (
      <div>
        {/* <DisplayPost newView={this.newView} {...this.state} /> */}
        <DisplayPost {...this.state} />
        {/* Here To add the FaceDetection */}
        <ReactPlayer url={"https://www.youtube.com/watch?v=8kOiLadbzpM"} />
      </div>
    );
  }
}
