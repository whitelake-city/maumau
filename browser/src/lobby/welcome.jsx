import React, {Component} from 'react';

import {Button, Col, Container, Input, InputGroup, Row} from 'reactstrap';
import {KartenRueckseite} from "../maumau/komponenten/karten/kartenRueckseite";

export class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        spielername: "",
    };

    setzeSpielernamen = (event) => {
        this.setState({ spielername: event.target.value })
    };

    erstelleSpieler = (event) => {
        event.preventDefault()
        this.props.api.erstelleSpieler(this.state.spielername, this.geheInDieLobby)
    }

    geheInDieLobby = (spieler) => {
        this.props.history.push(`/lobby/${spieler.id}`)
        this.props.setzeErstelltenSpieler(spieler)
    };

    render() {
        return (
            <div className={"welcome"}>
                <Container>
                    <Row>
                        <KartenRueckseite/>
                    </Row>
                    <Row>
                        <Col>
                            <form onSubmit={this.erstelleSpieler}>
                                <InputGroup>
                                    <Input placeholder="Spielername" onChange={this.setzeSpielernamen} required/>
                                </InputGroup>
                                <InputGroup>
                                    <Button color="success" disabled={this.state.spielername.length < 1}>Neues Siel erstellen</Button>
                                </InputGroup>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}