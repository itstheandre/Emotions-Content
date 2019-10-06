import React, { Component } from "react";
import axios from "axios";
import UserCard from "./UserCard";

export default class CreatorPage extends Component {
  state = {
    content: [],
    user: ""
  };

  componentDidMount = () => {
    console.log("Mounted");
    this.getData();
  };

  getData = () => {
    // console.log(this.props.match.params);
    const { user } = this.props.match.params;
    axios.get(`/u/api/${user}`).then(contentArr => {
      this.setState({
        content: contentArr.data,
        user
      });
    });
  };

  render() {
    console.log("André", this.state);
    return (
      <>
        {this.state.content.reverse().map(el => {
          return <UserCard content={el} key={el._id} user={this.state.user} />;
        })}
      </>
    );
  }
}
