import React from 'react';
import {SpielerKarten} from "./komponenten/spielerkarten/spieler";
import {Gegner} from "./komponenten/gegnerkarten/gegner";
import {KartenStapel} from "./komponenten/kartenstapel/kartenstapel";
import {ART, WERT} from "./konstanten";

export class MauMau extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');
        this.karteGewaehlt = this.karteGewaehlt.bind(this);

        this.state = {
            gegner: [
                {
                    name: "Horst",
                    kartenanzahl: 2
                },
                {
                    name: "Peter",
                    kartenanzahl: 11
                },
                {
                    name: "Gertrude",
                    kartenanzahl: 8
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
                id: this.props.match.params.spielerId,
                name: this.props.match.params.spielerId,
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
        console.log('component did mount');
        // TODO load all necessary information and sort opponents by name lexicographically for a steady order or provide an arbitrary id
        this.setState(this.state.gegner.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }))
    }

    karteGewaehlt(position) {
        // TODO send picked card to server
        var karte = this.state.spieler.karten[position];

        this.state.spieler.karten.splice(position, 1);
        this.setState({
                          kartenstapel: {
                              aktuellSichtbareKarte: karte
                          }
                      })
    }

    render() {
        console.log('render');
        return (
            <div className={"maumau"}>
                <Gegner gegner={this.state.gegner}/>
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