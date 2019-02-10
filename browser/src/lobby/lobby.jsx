import React, {Component} from "react";
import Container from "reactstrap/es/Container";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

export class Lobby extends Component {

    constructor(props) {
        super(props);
        this.ladeLobby = this.ladeLobby.bind(this);
    }

    timer = 0;

    state = {
        spieler: [],
    };

    ladeLobby = () => {
        this.props.api.ladeLobby(
            this.props.match.params.spielerId,
            (spieler) => {
                // if (spieler.every(spieler => spieler.status !== 'starten')) {
                    this.setState({ spieler: spieler });
                // } else {
                //     this.props.history.replace(`maumau/${spieler.id}`)
                // }
            });

        this.componentWillMount();
    };

    componentWillMount() {
        this.timer = setTimeout(this.ladeLobby, 1000);
    }

    componentWillUnmount() {
        // remove timer
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Willkommen in der Lobby {this.props.match.params.spielerId}!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Spieler:</h3>
                    </Col>
                </Row>
                {this.state.spieler.map(
                    (spieler) => {
                        return (
                            <Row key={spieler.id}>
                                <Col>{spieler.name}</Col>
                                <Col>{spieler.status}</Col>
                            </Row>
                        );
                    }
                )}
                <Row>
                    <Col><Button onClick={console.log("I want to start")}/> </Col>
                </Row>

            </Container>
        );
    }
}