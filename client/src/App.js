import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import ContentManager from "./components/ContentManager";

class App extends React.Component {
  state = {
    user: this.props.user
  };

  setUser = user => {
    this.setState({
      user
    });
  };

  render() {
    console.log(this.state.user._id);
    return (
      <div className='App'>
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Route
          exact
          path='/signup'
          render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path='/login'
          render={props => <Login setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path='/content'
          render={props => <ContentManager user={this.state.user} {...props} />}
        />
      </div>
    );
  }
}

export default App;
