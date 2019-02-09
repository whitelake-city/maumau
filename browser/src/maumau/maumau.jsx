import React from 'react';
import {SpielerKarten} from "./komponenten/spielerkarten/spieler";
import {Gegner} from "./komponenten/gegnerkarten/gegner";
import {KartenStapel} from "./komponenten/kartenstapel/kartenstapel";

export class MauMau extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gegner: [
                {
                    name: "Gegner 2",
                    kartenanzahl: 2
                },
                {
                    name: "Gegner 1",
                    kartenanzahl: 3
                },
                {
                    name: "Gegner 3",
                    kartenanzahl: 8
                },
            ],
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
                <KartenStapel/>
                <SpielerKarten spielername={this.props.match.params.spielername}/>
            </div>
        )
    }
}