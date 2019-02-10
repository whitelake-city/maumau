import React, {Component} from 'react'
import openSocket from 'socket.io-client';
import {Button, Col, Container, Input, InputGroup, Row} from 'reactstrap';

class ApiComponent extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        spielername: '',
        spieler: []
    };

    erstelleSpieler = (ereignis) => {
        ereignis.preventDefault();
        this.props.api.erstelleSpieler(this.state.spielername, this.spielerErstellt)
    };

    spielerErstellt = (ergebnis) => {
        if (ergebnis.ok) {
            this.setState((alterState) => ({
                spieler: [...alterState.spieler, ergebnis]
            }))
        } else {
            console.log("Fehler beim Erstellen des Spielers.");
        }
    };

    setzeSpielernamen = (ereignis) => {
        this.setState({
                          spielername: ereignis.target.value
                      })
    };

    spielGestartet = (ergebnis) => {
        console.log(ergebnis)
        this.props.api.warteAufAlleSpielerBereit(ergebnis,()=>{
            console.log('Geht los');
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <h2>Befehle</h2>
                </Row>
                <Row>
                    <Col>
                        <form onSubmit={this.erstelleSpieler}>
                            <InputGroup>
                                <Input placeholder="Spielername" onChange={this.setzeSpielernamen} required/>
                            </InputGroup>
                            <InputGroup>
                                <Button color="success" disabled={this.state.spielername.length < 1}>Spieler erstellen</Button>
                            </InputGroup>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <h2>Erstellte Spieler</h2>
                </Row>
                <Row>
                    <Col>
                        <ul>
                            {this.state.spieler.map(spieler => (
                                <Spieler api={this.props.api} spieler={spieler} key={spieler.id} spielGestartet={this.spielGestartet}/>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <h2>Spiele</h2>
                </Row>
                {/* <Row>
                    <Col>
                        <ul>
                            {this.state.spieler.map(spieler => (
                                <Spieler api={this.props.api} spieler={spieler} key={spieler.id} spielGestartet={this.spielGestartet} />
                            ))}
                        </ul>
                    </Col>
                </Row> */}
            </Container>
        )
    }
}

class Spieler extends Component {
    spielStarten = (ereignis) => {
        ereignis.preventDefault();
        this.props.api.spielStarten(this.props.spieler.id, this.props.spielGestartet)
    };

    render() {
        return (
            <Button
                key={this.props.spieler.id}
                onClick={this.spielStarten}
            >
                {this.props.spieler.name}
            </Button>
        )
    }
}

class Api {
    socket = null;

    connect() {
        this.socket = openSocket('http://localhost:8000')
    }

    erstelleSpieler(name, rueckruf) {
        this.socket.emit(
            'erstelleSpieler',
            { name },
            (ergebnis) => {
                rueckruf(ergebnis)
            }
        )
    }

    spielStarten(spielerId, rueckruf) {
        this.socket.emit(
            'spielStarten',
            { spielerId },
            (ergebnis) => {
                rueckruf(ergebnis)
            }
        )
    }

    ladeLobby(spielerId, rueckruf) {
        this.socket.emit(
            'ladeLobby',
            { spielerId },
            (ergebnis) => {
                rueckruf(ergebnis)
            }
        )
    }
    warteAufAlleSpielerBereit(spielId, callback) {
        this.socket.on(
            `spielGestartet${spielId}`,
            callback
        )
    }
}

export {ApiComponent, Api}