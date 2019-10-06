import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class ContentDashCard extends Component {
  state = {
    textToCopy: ""
  };

  componentDidMount = () => {
    const id = this.props.content._id;
    const user = this.props.user.username;
    this.setState({
      textToCopy: `http://localhost:3000/u/${user}/${id}`
    });
  };

  handleClick = event => {
    event.preventDefault();
    return Axios.delete(`/api/content/${this.props.content._id}`).then(
      response => {
        // console.log(response.data);
        this.props.getData();
      }
    );
  };
  render() {
    // console.log(this.props.user.username);
    return (
      <div className='contentCard'>
        <h2>{this.props.content.title}</h2>
        <h4>{this.props.content.date}</h4>
        <button>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/content-dashboard/${this.props.content._id}`}
          >
            View
          </Link>
        </button>
        <button>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/edit/${this.props.content._id}`}
          >
            Edit
          </Link>
        </button>
        <button onClick={this.handleClick}>Delete</button>
        <button
          onClick={() => navigator.clipboard.writeText(this.state.textToCopy)}
        >
          Share now
        </button>
      </div>
    );
  }
}
