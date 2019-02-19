import React, { Component } from "react";
import { KartenVorderseite } from "../karten/kartenVorderseite";

export class SpielerKarten extends Component {
    istGueltigerZug = (kartenPosition) => {
        let spielerKarte = this.props.spiel.spieler.karten[kartenPosition];
        let gelegt = this.props.spiel.gelegt
        if(spielerKarte.art === gelegt.art || spielerKarte.wert === gelegt.wert) {
            return true
        }
        return false
    }
    render() {
        return (
            <div className={"spieler"}>
                <h1 className={"name"}>{this.props.spiel.spieler.name}</h1>
                <div className={this.props.spiel.spieler.amZug ? "karten" : "karten-deaktiviert"}>
                    {
                        this.props.spiel.spieler.karten.map(
                            (aktuelleKarte, idx) => (
                                <KartenVorderseite
                                    key={idx}
                                    position={idx}
                                    api={this.props.api}
                                    spielId={this.props.spiel.id}
                                    spielerId={this.props.spiel.spieler.id}
                                    karte={aktuelleKarte}
                                    amZug={this.props.spiel.spieler.amZug}
                                    istGueltigerZug={this.istGueltigerZug}
                                />
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}