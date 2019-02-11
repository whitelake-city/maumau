import React, {Component} from "react";
import Container from "reactstrap/es/Container";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import Button from "reactstrap/es/Button";

export class Lobby extends Component {

    constructor(props) {
        super(props);
        // this.props.api.spielStarten(this.props.spieler.id, this.ladeLobby)
    }

    // timer = 0;
    state = {
        spieler: this.props.spieler,
        spiel: {
            spieler: [],
        }
    };

    ladeLobby = (spiel) => {
        console.log(spiel)
        // this.props.api.ladeLobby(
        //     this.props.match.params.spielerId,
        //     (spieler) => {
        //         if (spieler.every(spieler => spieler.status === 'bereit')) {
        //             this.props.history.push(`/mau-mau/${this.props.match.params.spielerId}`)
        //         } else {
        //             this.setState({
        //                               spielername: spieler[0].name,
        //                               spieler: spieler
        //                           });
        //         }
        //     });

        // this.componentWillMount();
    };

    starteSpiel = () => {
        // TODO push new state to server - will start game once everyone is ready
        // this.props.history.push(`/mau-mau/${this.props.match.params.spielerId}`)
    };

    // componentWillMount() {
    //     this.timer = setTimeout(this.ladeLobby, 1000);
    // }

    // componentWillUnmount() {
    //     // remove timer
    //     clearTimeout(this.timer);
    // }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Willkommen in der Lobby {this.state.spieler.name}!</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3>Spieler:</h3>
                    </Col>
                </Row>
                {this.state.spiel.spieler.map(
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