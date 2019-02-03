import React, { Component } from 'react'
import openSocket from 'socket.io-client';
import { Button, Container, Row, Col, InputGroup, Input } from 'reactstrap';

class ApiComponent extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        spielername: '',
        spieler: []
    }

    erstelleSpieler = (ereignis) => {
        ereignis.preventDefault()
        this.props.api.erstelleSpieler(this.state.spielername, this.spielerErstellt)
    }

    spielerErstellt = (ergebnis) => {
        if (ergebnis.ok)
            this.setState((alterState) => ({
                spieler: [...alterState.spieler, ergebnis]
            }))
    }

    setzeSpielernamen = (ereignis) => {
        this.setState({
            spielername: ereignis.target.value
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
                                <Input placeholder="Spielername" onChange={this.setzeSpielernamen} required />
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
                                <li
                                    key={spieler.id}
                                >
                                    {spieler.name}
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}

class Api {
    socket = null
    connect() {
        this.socket = openSocket('http://localhost:8000')
    }

    erstelleSpieler(name, rueckfuf) {
        this.socket.emit(
            'erstelleSpieler',
            { name },
            (result) => {
                rueckfuf(result)
            }
        )
    }
}

export { ApiComponent, Api }