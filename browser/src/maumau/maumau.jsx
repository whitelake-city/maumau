import React from 'react';
import {SpielerKarten} from "./komponenten/spielerkarten/spieler";
import {Gegner} from "./komponenten/gegnerkarten/gegner";
import {KartenStapel} from "./komponenten/kartenstapel/kartenstapel";
import {ART, WERT} from "./konstanten";

export class MauMau extends React.Component {
    constructor(props) {
        super(props);
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
                    art: ART.HERZ,
                    wert: WERT.ASS
                }
            }
        };
    }

    componentDidMount() {
        // TODO load oponents and sort by name to have a constant order for displaying. maybe provide arbitrary key for sorting.
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

    render() {
        return (
            <div className={"maumau"}>
                <Gegner gegner={this.state.gegner}/>
                <KartenStapel
                    kartenanzahl={this.state.kartenstapel.kartenanzahl}
                    aktuellSichtbareKarte={this.state.kartenstapel.aktuellSichtbareKarte}/>
                <SpielerKarten spielername={this.props.match.params.spielername}/>
            </div>
        )
    }
}