import React, {Component} from "react";
import {KartenVorderseite} from "../karten/kartenVorderseite";

export class SpielerKarten extends Component {

    istGueltigerZug = (kartenPosition) => {
        let spielerKarte = this.props.spiel.spieler.karten[kartenPosition];
        let gelegt = this.props.spiel.gelegt;

        return spielerKarte.wert === gelegt.wert
               || (spielerKarte.art === gelegt.art && !(gelegt.wert === '7' && gelegt.spezialEffektAktiv));
    };

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