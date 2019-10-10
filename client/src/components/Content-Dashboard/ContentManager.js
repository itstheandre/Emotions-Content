import React, { Component } from "react";
import Axios from "axios";
import ContentDashCard from "./ContentDashCard";
import { Link } from "react-router-dom";

export default class ContentManager extends Component {
  state = {
    user: this.props.user,
    content: [],
    textToCopy: "",
    message: ""
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    Axios.get("/api/content").then(contentArr => {
      this.setState({
        content: contentArr.data.reverse()
      });
    });
  };

  setNewMessage = () => {
    this.setState({
      message: "Your link has been copied to the clipboard"
    });
    setTimeout(() => {
      this.setState({ message: "" });
    }, 2000);
  };

  render() {
    // console.log(this.state.content);
    const { user, content } = this.state;
    const filled = content.length === 0 ? false : "Not empty";

    if (!user) return <h1>You are not logged in, so no dashboard for you</h1>;

    return (
      <>
        <div>
          <h2 style={{ textAlign: "center" }} className='logIn h3'>
            My Content Dashboard
          </h2>
          <p>{this.state.message}</p>
          <br />
          {!filled && <div>Click above </div>}
          {this.state.content.map(el => {
            return (
              <div className='text-center dashCard' key={el._id}>
                <ContentDashCard
                  content={el}
                  getData={this.getData}
                  key={el._id}
                  user={this.state.user}
                  setNewMessage={this.setNewMessage}
                />
              </div>
            );
          })}
        </div>
        <div className='fixed-bottom addBtn'>
          <Link to='/content-dashboard/add'>
            <i className='fas fa-3x fa-plus-circle text-default'></i>
          </Link>
        </div>
      </>
    );
  }
}
