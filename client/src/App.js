import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import ContentManager from "./components/Content-Dashboard/ContentManager";
import AddContent from "./components/Content-Dashboard/AddContent";
import Post from "./components/Post";
import EditContent from "./components/Content-Dashboard/EditContent";

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
          path='/content-dashboard'
          render={props => <ContentManager user={this.state.user} {...props} />}
        />
        <Route exact path='/content-dashboard/:unique' component={Post} />
        <Route exact path='/content-dashboard/add' component={AddContent} />
        <Route exact path='/edit/:editPost' component={EditContent} />
      </div>
    );
  }
}

export default App;
