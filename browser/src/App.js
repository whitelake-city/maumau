import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './App.css'
import Lobby from './lobby/lobby'
import MauMau from './maumau/maumau'
import {ApiComponent, Api} from './api/api'

class App extends Component {
  state = {
    api: new Api()
  }
  componentDidMount() {
    this.state.api.connect()
  }
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Route exact path="/" component={Lobby} />
          <Route path="/mau-mau/:spielername" component={MauMau} />
          <Route path="/api" component={props => <ApiComponent {...props} api={this.state.api} />} />
        </div>
      </Router>
    );
  }
}

export default App;
