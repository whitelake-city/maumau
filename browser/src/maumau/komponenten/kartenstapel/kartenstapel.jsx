import React, {Component} from "react";
import {KartenRueckseite} from "../karten/kartenRueckseite";
import {KartenVorderseite} from "../karten/kartenVorderseite";

export class KartenStapel extends Component {
    render() {
        return (
            <div className={"kartenstapel"}>
                <KartenRueckseite/>
                <KartenVorderseite karte={this.props.aktuellSichtbareKarte}/>
            </div>
        );
    }
}