import React, { Component } from "react";

export class KartenRueckseite extends Component {

    beiClick = (event) => {
        event.preventDefault();

        if (this.props.beiClick !== undefined) {
            this.props.beiClick();
        }
    };

    render() {
        if (this.props.stapelGroesse !== undefined) {
            return (
                <div className={"stapel"}>
                    <img src={"/karten/rueckseite.svg"} className={"kartenrueckseite"} alt={"karten rueckseite"} onClick={this.beiClick} />
                    <h4 className={"stapelanzahl"}>{this.props.stapelGroesse}</h4> 
                </div>
            )
        } else {
            return (
                <img src={"/karten/rueckseite.svg"} className={"kartenrueckseite"} alt={"karten rueckseite"} onClick={this.beiClick} />
            )
        }
    }
}