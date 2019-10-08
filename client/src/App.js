import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import ContentManager from "./components/Content-Dashboard/ContentManager";
import AddContent from "./components/Content-Dashboard/AddContent";
import Post from "./components/Post";
import EditContent from "./components/Content-Dashboard/EditContent";
import DetectEmotion from "./components/UserViews/DetectEmotion";
import CreatorPage from "./components/UserViews/CreatorPage";
import rd3 from 'react-d3';
import { PieChart } from 'react-d3';
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
    var PieChart = rd3.PieChart;
    var pieData = [
      {label: 'Margarita', value: 20.0},
      {label: 'John', value: 55.0},
      {label: 'Tim', value: 25.0 }
    ];
    return (
      <div className="App">
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
        <Route exact path='/content-dashboard/add' component={AddContent} />
        <Route exact path='/content-dashboard/:unique' component={Post} />
        <Route exact path='/edit/:editPost' component={EditContent} />
        <Route exact path={"/u/:user"} component={CreatorPage} />
        <Route exact path={`/u/:user/:id`} component={DetectEmotion} />
        <Route exact path={"/chart"} render={() => <PieChart data={pieData}
           width={400}
           height={400}
           radius={100}
           innerRadius={20}
           sectorBorderColor="white"
           title="Pie Chart" />} /> 
      </div>
    );
  }
}

export default App;
