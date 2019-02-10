import * as React from "react";
import {Karte} from "./karte";

export class GegnerKarten extends React.Component {

    render() {
        return (
            <div className={"gegner"}>
                <div className={"karten " + (this.props.gegner.kartenanzahl > 3 ? 'ueberlappend' : '')}>
                    {
                        [...Array(this.props.gegner.kartenanzahl)]
                            .map((x, idx) => <Karte key={idx}/>)
                    }
                </div>
                <h1 className={"name"}>{this.props.gegner.name}</h1>
            </div>
        );
    }
}