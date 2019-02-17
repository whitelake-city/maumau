import React, {Component} from "react";

export class KartenRueckseite extends Component {

    beiClick = (event) => {
        event.preventDefault();

        if (this.props.beiClick !== undefined) {
            this.props.beiClick();
        }
    };

    render() {
        return (
            <img src={"/karten/rueckseite.svg"} className={"kartenrueckseite"} alt={"karten rueckseite"} onClick={this.beiClick}/>
        )
    }
}