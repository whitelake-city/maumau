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

    componentDidMount() {
        // TODO load all necessary information and sort opponents by name lexicographically for a steady order or provide an arbitrary id
    }

    karteGewaehlt = (position) => {
        // TODO send picked card to server
        var karte = this.state.spieler.karten[position];

        this.state.spieler.karten.splice(position, 1);
        this.setState({
            kartenstapel: {
                aktuellSichtbareKarte: karte
            }
        })
    };

    render() {
        return (
            <div className={"maumau"}>
                <Mitspieler mitspieler={this.props.spiel.mitspieler} />
                <KartenStapel
                    // aktuellSichtbareKarte={this.props.spiel.stapel.karte}
                    aktuellSichtbareKarte={ { art: "pik", wert: "b"} }
                />
                <SpielerKarten
                    spieler={this.props.spiel.spieler}
                    beiClick={this.karteGewaehlt}
                />
            </div>
        )
    }
}