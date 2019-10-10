import React, { Component } from "react";
import Axios from "axios";
import ContentDashCard from "./ContentDashCard";
import { Link } from "react-router-dom";

export default class ContentManager extends Component {
  state = {
    user: this.props.user,
    content: [],
    textToCopy: ""
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    Axios.get("/api/content").then(contentArr => {
      this.setState({
        content: contentArr.data
      });
    });
  };

  setTextToCopy = id => {
    const { username } = this.state.user.username;
    this.setState({
      textToCopy: `http://localhost:3000/u/${username}/${id}`
    });
    navigator.clipboard.writeText(this.state.textToCopy);
  };

  render() {
    // console.log(this.state.content);
    const { user, content } = this.state;
    const filled = content.length === 0 ? false : "Not empty";

    if (!user) return <h1>You are not logged in, so no dashboard for you</h1>;

    return (
      <>
        <div>
          <h2 style={{ textAlign: "center" }} className="logIn h3">
            My Content Dashboard
          </h2>

          <br />
          {!filled && <div>Click above </div>}
          {this.state.content.reverse().map(el => {
            return (
              <div className="text-center dashCard">
                <ContentDashCard
                  content={el}
                  getData={this.getData}
                  key={el._id}
                  user={this.state.user}
                />
              </div>
            );
          })}
        </div>
        <div className="fixed-bottom addBtn">
          <Link to="/content-dashboard/add">
            <i className="fas fa-3x fa-plus-circle text-default"></i>
          </Link>
        </div>
      </>
    );
  }
}
