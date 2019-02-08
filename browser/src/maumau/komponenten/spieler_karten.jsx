import React, {Component} from "react";
import {Karte} from "./karte";
import {ART, WERT} from "../konstanten";

export class SpielerKarten extends Component {

    constructor(props) {
        super(props);

        this.karteGewaehlt = this.karteGewaehlt.bind(this);

        this.state = {
            laedt: true,
            karten: [],
        }
    }

    componentDidMount() {
        // TODO load cards from server
        this.setState({
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
                      })
    }

    karteGewaehlt(position) {
        console.log(position)
        // TODO send picked card to server
        this.setState(this.state.karten.splice(position, 1))
    }

    render() {
        return (
            <div className={"spielerkarten"}>
                <h1 className={"spielername"}>{this.props.spielername}</h1>
                <div className={"karten"}>
                    {
                        this.state.karten.map((aktuelleKarte, idx) => {
                            console.log(idx);
                            return (<Karte key={idx} position={idx} karte={aktuelleKarte} beiClick={this.karteGewaehlt}/>);
                        })
                    }
                </div>
            </div>
        )
    }
}