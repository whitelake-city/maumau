import React, {Component} from "react";
import {KartenVorderseite} from "../karten/kartenVorderseite";

export class SpielerKarten extends Component {
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
                                />
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}