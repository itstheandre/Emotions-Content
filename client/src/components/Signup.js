import React, { Component } from "react";
import { signup } from "../services/api";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    signup(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message
        });
      } else {
        this.props.setUser(data);
        this.props.history.push("/");
        console.log(data);
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    console.log(this.state.username);
    return (
      <>
        <h1>Sign up</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            name='username'
            id='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          {this.state.message && <h1>{this.state.message}</h1>}
          <button type='submit'>Create Account</button>
        </form>
      </>
    );
  }
}
