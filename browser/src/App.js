import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Lobby from './lobby/lobby';
import MauMau from './maumau/maumau';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Route exact path="/" component={Lobby} />
          <Route path="/mau-mau/:spielername" component={MauMau} />
        </div>
      </Router>
    );
  }
}

export default App;
