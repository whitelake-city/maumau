import React, {Component} from "react";

export class KartenVorderseite extends Component {
    constructor(props) {
        super(props);
    }

    beiClick = (event) => {
        event.preventDefault();
        this.props.api.spieleKarte(this.props.spielId, this.props.position);
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