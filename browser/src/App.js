import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom"
import './App.css'
import {Welcome} from './lobby/welcome'
import {MauMau} from "./maumau/maumau";
import {Api, ApiComponent} from './api/api'
import {Lobby} from "./lobby/lobby";

class App extends Component {
    state = {
        api: new Api()
    };

    componentDidMount() {
        this.state.api.connect()
    }

    render() {
        return (
            <Router>
                <div className={"router"}>
                    <Route exact path="/" component={props => <Welcome {...props} api={this.state.api}/>}/>
                    <Route path="/lobby/:spielerId" component={props => <Lobby {...props} api={this.state.api}/>}/>
                    <Route path="/mau-mau/:spielerId" component={props => <MauMau {...props} />}/>
                    <Route path="/api" component={props => <ApiComponent {...props} api={this.state.api}/>}/>
                </div>
            </Router>
        );
    }
}

export default App;
