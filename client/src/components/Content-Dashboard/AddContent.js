import React, { Component } from "react";
import Axios from "axios";

export default class AddContent extends Component {
  state = {
    url: "",
    title: "",
    contentType: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { url, title, contentType } = this.state;
    Axios.post("/api/content/add", { url, title, contentType }).then(() => {
      this.props.history.push("/content-dashboard");
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='url'>URL</label>
          <input
            type='text'
            name='url'
            id='title'
            value={this.state.url}
            onChange={this.handleChange}
          />
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label htmlFor='contentType'>Content Type</label>
          <input
            type='text'
            name='contentType'
            id='contentType'
            value={this.state.contentType}
            onChange={this.handleChange}
          />
          <button type='submit'>Add your lovely content now</button>
        </form>
      </>
    );
  }
}
