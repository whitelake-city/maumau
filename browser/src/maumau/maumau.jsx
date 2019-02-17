import React from 'react';
import {SpielerKarten} from "./komponenten/spielerkarten/spieler";
import {Mitspieler} from "./komponenten/gegnerkarten/mitspieler";
import {KartenStapel} from "./komponenten/kartenstapel/kartenstapel";
import {ART, WERT} from "./konstanten";

export class MauMau extends React.Component {
    constructor(props) {
        super(props);
        if (!props.spiel.id) {
            this.props.sucheSpiel(this.props.match.params.spielerId)
        }
        this.state = {
            mitspieler: [
                {
                    name: "Horst",
                    karten: 2
                },
                {
                    name: "Peter",
                    karten: 11
                },
                {
                    name: "Gertrude",
                    karten: 8
                },
            ],
            kartenstapel: {
                kartenanzahl: 10,
                aktuellSichtbareKarte: {
                    art: ART.PIK,
                    wert: WERT.ASS
                }
            },
            spieler: {
                id: this.props.spiel.spieler.id,
                name: this.props.spiel.spieler.name,
                karten: [
                    {
                        art: ART.KARO,
                        wert: WERT.ASS
                    },
                    {
                        art: ART.PIK,
                        wert: WERT.BUBE
                    },
                    {
                        art: ART.HERZ,
                        wert: WERT.DAME
                    },
                    {
                        art: ART.KREUZ,
                        wert: WERT.KOENIG
                    },
                ]
            },
        };

    }

    componentDidMount() {
        // TODO load all necessary information and sort opponents by name lexicographically for a steady order or provide an arbitrary id
        this.setState(this.state.mitspieler.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }))
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
                <Mitspieler mitspieler={this.state.mitspieler} />
                <KartenStapel
                    kartenanzahl={this.state.kartenstapel.kartenanzahl}
                    aktuellSichtbareKarte={this.state.kartenstapel.aktuellSichtbareKarte}
                />
                <SpielerKarten
                    spieler={this.state.spieler}
                    beiClick={this.karteGewaehlt}
                />
            </div>
        )
    }
}