import React, {Component} from "react";
import {KartenRueckseite} from "../karten/kartenRueckseite";
import {KartenVorderseite} from "../karten/kartenVorderseite";

export class KartenStapel extends Component {

    zieheKarte = () => {
        if (this.props.spiel.spieler.amZug) {
            this.props.api.zieheKarte(this.props.spiel.id, this.props.spiel.spieler.id)
        }
    };

    render() {
        return (
            <div className={"kartenstapel"}>
                <KartenRueckseite beiClick={this.zieheKarte} stapelGroesse={this.props.spiel.stapel} />
                {/* <span className={"stapelanzahl"}>{this.props.spiel.stapel}</span>  */}
                <KartenVorderseite karte={this.props.spiel.gelegt}/>
            </div>
        );
    }
}