import React, { Component } from "react";
import Axios from "axios";

export default class AddContent extends Component {
  state = {
    url: "",
    title: "",
    contentType: "",
    body: "",
    imagePath: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { url, title, contentType, body, imagePath } = this.state;
    console.log("Anyone?");
    Axios.post("/api/content/add", {
      url,
      title,
      contentType,
      body,
      imagePath
    }).then(() => {
      this.props.history.push("/content-dashboard");
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
          <label htmlFor='url'>URL</label>
          <input
            type='text'
            name='url'
            id='title'
            value={this.state.url} 
            onChange={this.handleChange}
          />
          <label htmlFor='content'>Content</label>
          <input
            type='file'
            name='imagePath'
            id='imagePath'
            ec
            value={this.state.imagePath}
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
          <label htmlFor='body'>Body</label>
          <input
            type='text'
            name='body'
            id='body'
            value={this.state.body}
            onChange={this.handleChange}
          />
          <button type='submit'>Add your lovely content now</button>
        </form>
      </>
    );
  }
}
