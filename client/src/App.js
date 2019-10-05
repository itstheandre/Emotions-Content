import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import ContentManager from "./components/Content-Dashboard/ContentManager";
import AddContent from "./components/Content-Dashboard/AddContent";
import Post from "./components/Post";

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
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route
            exact
            path="/signup"
            render={props => <Signup setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/login"
            render={props => <Login setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/content-dashboard"
            render={props => (
              <ContentManager user={this.state.user} {...props} />
            )}
          />
          <Route exact path="/content-dashboard/add" component={AddContent} />
          <Route path="/content-dashboard/:unique" component={Post} />
        </Switch>
      </div>
    );
  }
}

export default App;
