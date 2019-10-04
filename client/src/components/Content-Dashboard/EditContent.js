import React, { Component } from "react";
import axios from "axios";

export default class EditContent extends Component {
  state = {
    title: "",
    body: ""
  };

  getData = () => {
    axios.get(`/api/content/${this.props._id}`).then(post => {
      // const ownerContent = contentArr.owner.filter(
      //   el => el.owner._id === this.state.user._id
      // );

      /* 
      name, url?, title, body
      */

      console.log(post.data);
      this.setState({});
    });
  };

  render() {
    return <div></div>;
  }
}
