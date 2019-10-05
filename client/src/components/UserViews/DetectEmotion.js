import React, { Component } from "react";
import Axios from "axios";
import DisplayPost from "./DisplayPost";

export default class Post extends Component {
  state = {
    title: "",
    body: "",
    id: "",
    owner: ""
  };

  componentDidMount = () => {
    this.getPostData();
  };

  getPostData = () => {
    const { user, id } = this.props.match.params;
    Axios.get(`/u/api/${user}/${id}`).then(response => {
      console.log(response.data);
      const { title, body, owner, id } = response.data;
      this.setState({
        title,
        body,
        id,
        owner
      });
    });
  };

  componentDidUpdate = () => {
    console.log("Updating mofo");
  };

  render() {
    return (
      <div>
        <DisplayPost {...this.state} />
      </div>
    );
  }
}
