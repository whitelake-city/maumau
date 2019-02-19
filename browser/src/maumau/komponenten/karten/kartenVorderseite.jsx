import React, { Component } from "react";

export class KartenVorderseite extends Component {
    state = {
        zugUngueltig: false
    }

    beiClick = (event) => {
        event.preventDefault();
        if (this.props.amZug && this.props.istGueltigerZug(this.props.position)) {
            this.props.api.spieleKarte(this.props.spielId, this.props.spielerId, this.props.position);
        } else {
            this.setState({ zugUngueltig: true })
            setTimeout(this.nachAblaufDerZeit, 3000)
        }
    };

    nachAblaufDerZeit = () => {
        this.setState({ zugUngueltig: false })
    }

    render() {
        let className = "kartenvorderseite"
        if (this.state.zugUngueltig) {
            className += " ungueltig"
        }
        return (
            <img src={"/karten/" + this.props.karte.art + "/" + this.props.karte.wert + ".svg"}
                className={className}
                onClick={this.beiClick}
                alt={this.props.karte.art + " " + this.props.karte.wert}
            />
        )
    }
}