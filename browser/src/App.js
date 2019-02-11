import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css'
import { Welcome } from './lobby/welcome'
import { MauMau } from "./maumau/maumau";
import { Api, ApiComponent } from './api/api'
import { Lobby } from "./lobby/lobby";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      api: new Api(),

      spiel: {
        mitspieler: [],
        spieler: {
          id: '',
          name: ''
        }
      }
    };
    this.state.api.connect()
  }

  componentDidMount() {

  }

  setzeErstelltenSpieler = (spielerId) => {
    this.state.api.spielStarten(spielerId, this.aktualisiereLobby)
  }

  aktualisiereLobby = (spiel) => {
    console.log(spiel)
    this.setState({ spiel: spiel })
  }

  render() {
    return (
      <Router>
        <div className={"router"}>
          <Route exact path="/" component={props => <Welcome {...props} setzeErstelltenSpieler={this.setzeErstelltenSpieler} api={this.state.api} />} />
          <Route
            path="/lobby/:spielerId"
            component={
              props =>
                <Lobby
                  {...props}
                  setzeErstelltenSpieler={this.setzeErstelltenSpieler}
                  api={this.state.api}
                  spiel={this.state.spiel}
                  spieler={this.state.spieler}
                />
            }
          />
          <Route path="/mau-mau/:spielerId" component={props => <MauMau {...props} />} />
          <Route path="/api" component={props => <ApiComponent {...props} api={this.state.api} />} />
        </div>
      </Router>
    );
  }
}

export default App;
