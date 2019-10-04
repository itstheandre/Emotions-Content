import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  state = {
    post: null
  };

  getPostData = () => {
    const { unique } = this.props.match.params;
    axios.get(`/api/content/${unique}`).then(response => {
      const post = response.data;
      console.log("Something to understand what is here  ", post);
    });
  };

  componentDidMount = () => {
    console.log("Component mounted!");
    this.getPostData();
  };

  render() {
    return <div>Added stuff here</div>;
  }
}
