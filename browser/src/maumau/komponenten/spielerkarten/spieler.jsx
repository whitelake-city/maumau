import React, {Component} from "react";
import {KartenVorderseite} from "../karten/kartenVorderseite";

export class SpielerKarten extends Component {
    render() {
        return (
            <div className={"spieler"}>
                <h1 className={"name"}>{this.props.spieler.name}</h1>
                <div className={"karten"}>
                    {
                        this.props.spieler.karten.map(
                            (aktuelleKarte, idx) => (
                                <KartenVorderseite key={idx} position={idx} karte={aktuelleKarte} beiClick={this.props.beiClick}/>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}