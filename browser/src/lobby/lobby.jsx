import React, { Component } from "react";
import Container from "reactstrap/es/Container";
import { Row } from "reactstrap";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

export class Lobby extends Component {
    constructor(props) {
        super(props)
        // if (!props.spiel.id) {
        //     this.props.setzeErstelltenSpieler(this.props.match.params.spielerId)
        // }
    }

    starteSpiel = () => {
        console.log("foo");
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Willkommen in der Lobby {this.props.spiel.spieler.name}!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Spieler:</h3>
                    </Col>
                </Row>
                {this.props.spiel.mitspieler.map(
                    (spieler) => {
                        return (
                            <Row key={spieler.name}>
                                <Col>{spieler.name}</Col>
                                <Col>{spieler.status}</Col>
                            </Row>
                        );
                    }
                )}
                <Row>
                    <Col><Button color="success" onClick={this.starteSpiel}>Spiel starten</Button> </Col>
                </Row>

            </Container>
        );
    }
}