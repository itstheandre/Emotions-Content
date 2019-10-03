import React, { Component } from "react";
import Axios from "axios";
import ContentDashCard from "./ContentDashCard";
import { Link } from "react-router-dom";

export default class ContentManager extends Component {
  state = {
    user: this.props.user,
    content: []
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    Axios.get("/api/projects").then(contentArr => {
      const ownerContent = contentArr.owner.filter(
        el => el.owner._id === this.state.user._id
      );
      this.setState({
        content: ownerContent
      });
    });
  };

  render() {
    const { user, content } = this.state;
    const empty = content.length === 0 ? false : "Not empty";

    if (!user) return <h1>You are not logged in, so no dashboard fot you</h1>;

    return (
      <>
        <h2>My Content Dashboard</h2>
        <Link to='/content/add'>Add content</Link>
        {!empty && <div>Time to add some more content</div>}
        {empty &&
          content.map(el => {
            return <ContentDashCard {...this.props} />;
          })}
      </>
    );
  }
}
