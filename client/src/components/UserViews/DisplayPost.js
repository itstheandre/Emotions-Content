import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DisplayPost extends Component {
  componentDidMount = () => {
    this.props.newView();
  };

  render() {
    return (
      <div>
        <Link to={`/u/${this.props.owner}`}>Check the creator's page</Link>
        <h1>{this.props.title}</h1>
        <h3>{this.props.owner}</h3>
        {this.props.body}
      </div>
    );
  }
}
