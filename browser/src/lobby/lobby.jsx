import React, { Component } from "react";
import Container from "reactstrap/es/Container";
import { Row } from "reactstrap";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

export class Lobby extends Component {
    constructor(props) {
        super(props)
        if (!props.spiel.id) {
            this.props.sucheSpiel(this.props.match.params.spielerId)
        } else {
            this.props.api.warteAufSpielStart(this.props.spiel.id, (spiel)=>{
                this.props.starteSpiel(spiel)
                this.props.history.push(`/mau-mau/${spiel.spieler.id}`)
            })
            this.props.api.warteAufSpielerBereit(this.props.spiel.id, this.props.aktualisiereSpiel)
        }
    }

    spielerIstBereit = () => {
        this.props.api.spielerIstBereit(this.props.spiel.spieler.id,this.props.aktualisiereSpiel)
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
                                <Col>{spieler.bereit===true?'bereit':'nicht bereit'}</Col>
                            </Row>
                        );
                    }
                )}
                <Row>
                    <Col><Button color="success" onClick={this.spielerIstBereit} disabled={this.props.spiel.spieler.bereit}>Spiel starten</Button> </Col>
                </Row>

            </Container>
        );
    }
}