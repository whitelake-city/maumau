import React, {Component} from "react";

export class KartenVorderseite extends Component {
    beiClick = (event) => {
        event.preventDefault();
        if (this.props.amZug) {
            this.props.api.spieleKarte(this.props.spielId, this.props.spielerId, this.props.position);
        }
    };

    render() {
        return (
            <img src={"/karten/" + this.props.karte.art + "/" + this.props.karte.wert + ".svg"}
                 className={"kartenvorderseite"}
                 onClick={this.beiClick}
                 alt={this.props.karte.art + " " + this.props.karte.wert}
            />
        )
    }
}