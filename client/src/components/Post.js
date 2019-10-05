import React, { Component } from "react";
import axios from "axios";

export default class Post extends Component {
  state = {
    title: "",
    body: "",
    id: "",
    owner: ""
  };

  getPostData = () => {
    const { unique } = this.props.match.params;
    axios.get(`/api/content/${unique}`).then(response => {
      const post = response.data;
      console.log(
        "Something to understand what is here  ",
        post.owner.username
      );
      const { title, body } = post;
      const id = post._id;
      const owner = post.owner.username;
      this.setState({
        title,
        body,
        id,
        owner,
        textToCopy: `http://localhost:3000/u/${owner}/${id}`
      });
    });
  };

  componentDidMount = () => {
    this.getPostData();
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.body}</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(this.state.textToCopy);
          }}
        >
          Share this link and check the emotional responses.
        </button>
      </div>
    );
  }
}
