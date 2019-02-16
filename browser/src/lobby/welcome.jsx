import React, {Component} from 'react';

import {Button, Input, InputGroup} from 'reactstrap';
import {KartenRueckseite} from "../maumau/komponenten/karten/kartenRueckseite";

export class Welcome extends Component {
    state = {
        spielername: "",
    };

    componentDidMount() {
        this.props.setzeSpielerZurueck();
    }

    setzeSpielernamen = (event) => {
        this.setState({ spielername: event.target.value })
    };

    erstelleSpieler = (event) => {
        event.preventDefault();
        this.props.api.erstelleSpieler(this.state.spielername, this.geheInDieLobby)
    };

    geheInDieLobby = (spieler) => {
        this.props.history.push(`/lobby/${spieler.id}`)
    };

    render() {
        return (
            <div className={"welcome"}>
                <KartenRueckseite/>
                <div className={"titel"}>
                    Mau<br/>Mau
                </div>
                <form onSubmit={this.erstelleSpieler} className={"spielerdaten"}>
                    <InputGroup>
                        <Input placeholder="Spielername" onChange={this.setzeSpielernamen} required/>
                    </InputGroup>
                    <InputGroup>
                        <Button disabled={this.state.spielername.length < 1}>Neues Siel erstellen</Button>
                    </InputGroup>
                </form>
            </div>
        )
    }
}