import React from 'react';
import {SpielerKarten} from "./komponenten/spielerkarten/spieler";
import {Mitspieler} from "./komponenten/mitspielerkarten/mitspieler";
import {KartenStapel} from "./komponenten/kartenstapel/kartenstapel";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export class MauMau extends React.Component {
    constructor(props) {
        super(props);

        if (!props.spiel.id) {
            this.props.sucheSpiel(this.props.match.params.spielerId);
        }

        this.props.api.warteAufSpielStatus(this.props.spiel.id,this.props.spiel.spieler.id, this.props.aktualisiereSpiel);
    }

    geheZumStart = () => {
        return this.props.history.push(`/`);
    };

    render() {
        return (
            <div className={'maumau'}>
                <Mitspieler mitspieler={this.props.spiel.mitspieler}/>
                <KartenStapel
                    spiel={this.props.spiel}
                    api={this.props.api}
                />
                <SpielerKarten
                    spiel={this.props.spiel}
                    api={this.props.api}
                />

                <Modal isOpen={this.props.spiel.spieler.karten.length === 0} className={'gewonnen'}>
                    <ModalHeader>Gewonnen! <span role="img">😁</span></ModalHeader>
                    <ModalBody>
                        Gratulation {this.props.spiel.spieler.name}, du hast gewonnen! Spiele weiter um noch mehr Siege zu erlangen.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.geheZumStart}>Neues Spiel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.props.spiel.mitspieler.some((mitspieler) => mitspieler.karten === 0)} className={'verloren'}>
                    <ModalHeader>Verloren <span role="img">😞</span></ModalHeader>
                    <ModalBody>Du hast leider verloren. Spiele noch ein Spiel, vielleicht hast du das nächste mal ja mehr Glück.</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.geheZumStart}>Neues Spiel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}