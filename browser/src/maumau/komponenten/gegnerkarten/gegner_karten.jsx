import * as React from "react";
import {Karte} from "./karte";

export class GegnerKarten extends React.Component {

    render() {
        return (
            <div className={"gegner"}>
                <div className={"karten"}>
                    {
                        this.props.gegner.kartenanzahl > 3
                        ? (
                            <div>
                                <Karte />
                                <p>{this.props.gegner.kartenanzahl}</p>
                            </div>
                        )
                        : (
                            [...Array(this.props.gegner.kartenanzahl)]
                            .map((x, idx) => <Karte key={idx}/>)
                        )
                    }
                </div>
                <h1 className={"name"}>{this.props.gegner.name}</h1>
            </div>
        );
    }
}