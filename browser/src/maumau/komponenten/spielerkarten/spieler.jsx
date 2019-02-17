import React, {Component} from "react";
import {KartenVorderseite} from "../karten/kartenVorderseite";

export class SpielerKarten extends Component {
    render() {
        let kartenKlasse = this.props.spieler.amZug?"karten":"karten-deaktiviert"
        return (
            <div className={"spieler"}>
                <h1 className={"name"}>{this.props.spiel.spieler.name}</h1>
                <div className={kartenKlasse}>
                    {
                        this.props.spiel.spieler.karten.map(
                            (aktuelleKarte, idx) => (
                                <KartenVorderseite
                                    key={idx}
                                    position={idx}
                                    api={this.props.api}
                                    spielId={this.props.spiel.id}
                                    karte={aktuelleKarte}/>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}