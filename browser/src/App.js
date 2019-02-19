import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css'
import { Welcome } from './lobby/welcome'
import { MauMau } from "./maumau/maumau";
import { Api, ApiComponent } from './api/api'
import { Lobby } from "./lobby/lobby";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: new Api(),

      spiel: {
        mitspieler: [],
        gelegt: {
          wert: 'b',
          art: 'pik'
        },
        spieler: {
          id: '',
          name: '',
          karten: []
        }
      }
    };
    this.state.api.connect()
  }

  setzeSpielerZurueck = () => {
    if (this.state.spiel.spieler.id !== '') {
      this.setState({
        spiel: {
          mitspieler: [],
          gelegt: {
            wert: 'b',
            art: 'pik'
          },
          spieler: {
            id: '',
            name: '',
            karten: []
          }
        }
      })
    }
  };

  sucheSpiel = (spielerId) => {
    this.state.api.sucheSpiel(spielerId, this.aktualisiereSpiel)
  };

  aktualisiereSpiel = (spiel) => {
    this.setState({ spiel: spiel })
  };

  starteSpiel = (spiel) => {
    this.setState({ spiel: spiel })
  };


  render() {
    return (
      <Router>
        <div className={"router"}>
          <Route exact path="/"
            component={props =>
              <Welcome
                {...props}
                setzeSpielerZurueck={this.setzeSpielerZurueck}
                api={this.state.api}
              />
            }
          />
          <Route
            path="/lobby/:spielerId"
            component={
              props =>
                <Lobby
                  {...props}
                  sucheSpiel={this.sucheSpiel}
                  starteSpiel={this.starteSpiel}
                  aktualisiereSpiel={this.aktualisiereSpiel}
                  api={this.state.api}
                  spiel={this.state.spiel}
                />
            }
          />
          <Route
            path="/mau-mau/:spielerId"
            component={
              props =>
                <MauMau
                  {...props}
                  spiel={this.state.spiel}
                  api={this.state.api}
                  sucheSpiel={this.sucheSpiel}
                  aktualisiereSpiel={this.aktualisiereSpiel}
                />
            }
          />
          <Route path="/api" component={props => <ApiComponent {...props} api={this.state.api} />} />
        </div>
      </Router>
    );
  }
}

export default App;
