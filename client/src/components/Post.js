import React, { Component } from "react";
import axios from "axios";


export default class Post extends Component {
  state = {
    title: "",
    body: "",
    id: "",
    owner: "",
    fullName: ""
  };

  getPostData = () => {
    const { unique } = this.props.match.params;
    axios.get(`/api/content/${unique}`).then(response => {
      const post = response.data;
      const { title, body } = post;
      const id = post._id;
      const owner = post.owner.username;
      const { fullName } = post.owner;
      this.setState({
        title,
        body,
        id,
        owner,
        fullName,
        textToCopy: `http://localhost:3000/u/${owner}/${id}`
      });
    });
  };

  componentDidMount = () => {
    this.getPostData();
  };

  render() {
    // console.log(this.state);
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
