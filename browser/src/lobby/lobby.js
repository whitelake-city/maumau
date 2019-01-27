import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Button, Container, Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';

class Lobby extends Component {
  state = {
    spielername: "",
  }

  setzeSpielernamen = (event) => {
    this.setState({ spielername: event.target.value })
  }

  starteSpiel = () => {
    this.props.history.push(`mau-mau/${this.state.spielername}`)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form onSubmit={this.starteSpiel}>
              <InputGroup>
                <Input placeholder="Spielername" onChange={this.setzeSpielernamen} required />
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

    )
  }
}

export default Lobby;
