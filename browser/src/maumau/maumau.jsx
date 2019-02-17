import React from 'react';
import {SpielerKarten} from "./komponenten/spielerkarten/spieler";
import {Mitspieler} from "./komponenten/mitspielerkarten/mitspieler";
import {KartenStapel} from "./komponenten/kartenstapel/kartenstapel";

export class MauMau extends React.Component {
    constructor(props) {
        super(props);
        if (!props.spiel.id) {
            this.props.sucheSpiel(this.props.match.params.spielerId)
        }
    }

    render() {
        return (
            <div className={"maumau"}>
                <Mitspieler mitspieler={this.props.spiel.mitspieler} />
                <KartenStapel
                    // aktuellSichtbareKarte={this.props.spiel.gelegt}
                    aktuellSichtbareKarte={ { art: "pik", wert: "b"} }
                />
                <SpielerKarten
                    spieler={this.props.spiel.spieler}
                    beiClick={this.props.karteGewaehlt}
                />
            </div>
        )
    }
}