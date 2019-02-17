import React, {Component} from "react";
import Container from "reactstrap/es/Container";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

export class Lobby extends Component {
    constructor(props) {
        super(props);

        if (!props.spiel.id) {
            this.props.sucheSpiel(this.props.match.params.spielerId);
        } else {
            this.props.api.warteAufSpielStart(this.props.spiel.id, (spiel) => {
                this.props.starteSpiel(spiel);
                this.props.history.push(`/mau-mau/${spiel.spieler.id}`);
            });

            this.props.api.warteAufSpielerBereit(this.props.spiel.id, this.props.aktualisiereSpiel);
        }
    }

    spielerIstBereit = () => {
        this.props.api.spielerIstBereit(this.props.spiel.spieler.id, this.props.aktualisiereSpiel);
    };

    render() {
        return (
            <Container className={"lobby-wrapper"}>
                <Row>
                    <Col>
                        <h1>Willkommen in der Lobby {this.props.spiel.spieler.name}!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="9">
                        <strong>Spieler:</strong>
                    </Col>
                    <Col xs="3">
                        <strong>Status:</strong>
                    </Col>
                </Row>
                <Row key={this.props.spiel.spieler.name}>
                    <Col xs="9">{this.props.spiel.spieler.name} (du)</Col>
                    <Col xs="3">{this.props.spiel.spieler.bereit ? "bereit" : "wartet"}</Col>
                </Row>
                {this.props.spiel.mitspieler.map(
                    (spieler) => {
                        return (
                            <Row key={spieler.name}>
                                <Col xs="9">{spieler.name}</Col>
                                <Col xs="3">{spieler.bereit ? "bereit" : "wartet"}</Col>
                            </Row>
                        );
                    }
                )}
                <Row className={"aktionen"}>
                    <Col sm={{ size: 'auto', offset: 5 }}><Button disabled={this.props.spiel.spieler.bereit}
                                                                  onClick={this.spielerIstBereit}>Spiel starten</Button></Col>
                </Row>
            </Container>
        );
    }
}