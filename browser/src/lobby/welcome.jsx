import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {Button, Col, Container, Input, InputGroup, Row} from 'reactstrap';
import {KartenRueckseite} from "../maumau/komponenten/karten/kartenRueckseite";

export class Welcome extends Component {

    constructor(props) {
        super(props);
        this.setzeSpielernamen = this.setzeSpielernamen.bind(this);
        this.geheInDieLobby = this.geheInDieLobby.bind(this);
    }

    state = {
        spielername: "",
    };

    setzeSpielernamen = (event) => {
        this.setState({ spielername: event.target.value })
    };

    geheInDieLobby = (event) => {
        event.preventDefault();
        console.log(this.state.spielername);
        this.props.api.erstelleSpieler(this.state.spielername, (spieler) => {
            this.props.history.push(`lobby/${spieler.id}`)
        })
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
                            <form onSubmit={this.geheInDieLobby}>
                                <InputGroup>
                                    <Input placeholder="Spielername" onChange={this.setzeSpielernamen} required/>
                                </InputGroup>
                                <InputGroup>
                                    <Button color="success" disabled={this.state.spielername.length < 1}>Neues Siel erstellen</Button>
                                </InputGroup>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to={`mau-mau/${this.state.spielername}`}>

                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}