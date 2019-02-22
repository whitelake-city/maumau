import React, { Component } from "react";

export class KartenVorderseite extends Component {
    state = {
        zugUngueltig: false
    };

    beiClick = (event) => {
        event.preventDefault();

        if (this.props.amZug && this.props.istGueltigerZug(this.props.position)) {
            if (this.istAss()) {
                this.props.api.spieleAss(this.props.spielId, this.props.spielerId, this.props.position)
            } else {
                this.props.api.spieleKarte(this.props.spielId, this.props.spielerId, this.props.position);
            }
        } else {
            this.setState({ zugUngueltig: true });
            setTimeout(this.nachAblaufDerZeit, 3000)
        }
    };

    istAss = () => {
        return this.props.karte.wert === 'a';
    };

    nachAblaufDerZeit = () => {
        this.setState({ zugUngueltig: false })
    };

    render() {
        let className = "kartenvorderseite";
        if (this.state.zugUngueltig) {
            className += " ungueltig"
        }
        return (
            <div>
                <img src={"/karten/" + this.props.karte.art + "/" + this.props.karte.wert + ".svg"}
                    className={className}
                    onClick={this.beiClick}
                    alt={this.props.karte.art + " " + this.props.karte.wert}
                />
            </div>
        )
    }
}